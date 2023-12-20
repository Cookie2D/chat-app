import { excludeFromObject } from 'src/utils/exclude';
import { MessageService } from './../message/message.service';
import { ChatService } from './chat.service';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Message, User } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { BadGatewayException } from '@nestjs/common';

interface OnlineUser {
  user: User;
  socketId: string;
  status: string;
}

interface ChatInfoResponse {
  chatId: number;
  // users: User;
  // users: UserOnChat[];
  messages: Message[];
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private onlineUsers: OnlineUser[] = [];
  private allUsers: OnlineUser[] = [];
  private admins: string[] = [];

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = String(client.handshake.query.token);
      const user = await this.authenticateUser(token);

      if (!user) {
        this.handleAuthenticationFailure(client);
        return;
      }

      this.handleExistingUser(client, user);

      this.onlineUsers.push({
        user,
        socketId: client.id,
        status: 'Online',
      });

      await this.getAllUsers();
      if (user.roleId === 1) {
        this.admins.push(client.id);
      }
      this.emitOnlineUsers();

      const chatInfo = await this.getChatInfo(user?.id);
      this.emitGetChatInfo(chatInfo);
    } catch (error) {
      this.handleConnectionError(client, error);
    }
  }

  async handleDisconnect(client: Socket) {
    this.onlineUsers = this.onlineUsers.filter(
      (onlineUser) => onlineUser.socketId !== client.id,
    );
    this.admins = this.admins.filter((socket) => socket !== client.id);
    await this.getAllUsers();

    this.emitOnlineUsers();
  }

  async getAllUsers() {
    const onlineUsers = this.onlineUsers;
    const allUsers = await this.userService.findAll();
    const formattedUser: OnlineUser[] = allUsers.map((user) => {
      const online = onlineUsers.find((oUser) => oUser.user.id === user.id);
      if (online) {
        return online;
      }
      return {
        user: {
          ...excludeFromObject(user, 'password'),
        },
        socketId: null,
        status: 'Offline',
      };
    });

    this.allUsers = formattedUser;
  }

  async getChatInfo(userId: number): Promise<ChatInfoResponse> {
    const chat = await this.chatService.getChatInfo();

    if (!chat) {
      const newChat = await this.chatService.createChat();
      const connectedChat = await this.chatService.appendChatUser(
        newChat.id,
        userId,
      );

      return {
        chatId: connectedChat.id,
        // users: connectedChat.users,
        messages: connectedChat.messages.reverse(),
      };
    }

    const connectedChat = await this.chatService.appendChatUser(
      chat.id,
      userId,
    );
    // console.log(connectedChat.users);

    return {
      chatId: connectedChat?.id,
      // users: connectedChat.users,
      messages: connectedChat.messages.reverse(),
    };
  }

  @SubscribeMessage('sendMessage')
  async onNewMessage(@MessageBody() body: any, client: Socket) {
    const user = await this.authenticateUser(body.token);

    if (!user) {
      this.handleAuthenticationFailure(client);
      return;
    }

    const trimmedMessage = body.message.trim();

    if (!trimmedMessage) {
      return;
    }

    if (trimmedMessage.length > 200) {
      throw new BadGatewayException(
        'Message should be no longer than 200 symbols',
      );
    }

    const lastMessage = await this.messageService.getLastMessageByUser(user.id);

    if (
      lastMessage &&
      Date.now() - new Date(lastMessage.createdAt).getTime() < 15000
    ) {
      throw new BadGatewayException(
        'Flood resistant: You can send a message once every 15 seconds.',
      );
      return;
    }

    const message = await this.messageService.createMessage(
      body.message,
      user.id,
      body.chatId,
    );

    this.emitNewMessage(message);
  }

  private async authenticateUser(token: string): Promise<User | null> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      return await this.userService.findOneById(payload?.sub);
    } catch (error) {
      console.error('User authentication error:', error);
      return null;
    }
  }

  private handleAuthenticationFailure(client: Socket) {
    client.disconnect(true);
    console.log('User authentication failed. Disconnecting.');
  }

  private handleExistingUser(client: Socket, user: User) {
    const existingUser = this.onlineUsers.find(
      (onlineUser) => onlineUser.user.id === user.id,
    );

    if (existingUser) {
      this.disconnectExistingUser(existingUser.socketId);
    }
  }

  private disconnectExistingUser(socketId: string) {
    this.server.sockets.sockets.get(socketId)?.disconnect();
    this.onlineUsers = this.onlineUsers.filter(
      (onlineUser) => onlineUser.socketId !== socketId,
    );
  }

  private handleConnectionError(client: Socket, error: any) {
    console.error('Error during user connection:', error);
    client.disconnect(true);
  }

  private emitOnlineUsers() {
    this.server.emit('getOnlineUsers', this.onlineUsers);
    this.onlineUsers.forEach((onlineUser) => {
      if (this.admins.some((socket) => socket === onlineUser.socketId)) {
        return;
      }

      this.server
        .to(onlineUser.socketId)
        .emit('getOnlineUsers', this.onlineUsers);
    });

    if (this.admins.length) {
      this.admins.forEach((socketId) => {
        this.server.to(socketId).emit('getOnlineUsers', this.allUsers);
      });
    }
  }

  private emitGetChatInfo(chatInfo: ChatInfoResponse) {
    this.server.emit('getChatInfo', chatInfo);
  }

  private emitNewMessage(message: Message) {
    this.server.emit('newMessage', message);
  }
}
