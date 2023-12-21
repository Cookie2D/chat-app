import { MessageService } from './../message/message.service';
import { ChatService } from './chat.service';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
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

interface ChatInfoResponse {
  chatId: number;
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
        client.disconnect(true);
        return;
      }
      this.handleExistingUser(client, user);

      client.data.user = user;
      this.emitOnlineUsers();

      const chatInfo = await this.getChatInfo(user?.id);
      this.emitGetChatInfo(chatInfo);
    } catch (error) {
      this.handleConnectionError(client, error);
    }
  }

  async handleDisconnect(client: Socket) {
    this.emitOnlineUsers();
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
  async onNewMessage(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    if (body.message.length > 200) {
      throw new BadGatewayException(
        'Message should be no longer than 200 symbols',
      );
    }

    const trimmedMessage = body.message.trim();

    if (!trimmedMessage) {
      return;
    }

    const lastMessage = await this.messageService.getLastMessageByUser(
      client.data.user.id,
    );

    if (
      lastMessage &&
      Date.now() - new Date(lastMessage.createdAt).getTime() < 15000
    ) {
      throw new BadGatewayException(
        'Flood resistant: You can send a message once every 15 seconds.',
      );
    }

    const message = await this.messageService.createMessage(
      body.message,
      client.data.user.id,
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

  private async handleExistingUser(client: Socket, user: User) {
    const connectedSockets = await this.server.fetchSockets();
    for (const connected of connectedSockets) {
      if (connected.data.user?.id === user.id && client.id !== connected.id) {
        connected.disconnect(true);
      }
    }
  }

  private handleConnectionError(client: Socket, error: any) {
    console.error('Error during user connection:', error); // TODO: replace with logger
    client.disconnect(true);
  }

  private async emitOnlineUsers() {
    const onlineUsersSet = new Set();

    const onlineConnections = await this.server.fetchSockets();

    const onlineUsers = onlineConnections
      .map((connection) => connection.data.user)
      .filter((user) => {
        if (user && !onlineUsersSet.has(user.id)) {
          onlineUsersSet.add(user.id);
          return true;
        }
        return false;
      });

    this.server.emit('getOnlineUsers', onlineUsers);
  }

  private emitGetChatInfo(chatInfo: ChatInfoResponse) {
    this.server.emit('getChatInfo', chatInfo);
  }

  private emitNewMessage(message: Message) {
    this.server.emit('newMessage', message);
  }
}
