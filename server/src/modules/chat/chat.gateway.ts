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
import { User } from '@prisma/client';
import { Server, Socket } from 'socket.io';

interface OnlineUser {
  user: User;
  socketId: string;
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

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
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
      });

      this.emitOnlineUsers();
    } catch (error) {
      this.handleConnectionError(client, error);
    }
  }

  handleDisconnect(client: Socket) {
    this.onlineUsers = this.onlineUsers.filter(
      (onlineUser) => onlineUser.socketId !== client.id,
    );
    this.emitOnlineUsers();
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    this.server.emit('onMessage', {
      msg: 'New message',
      content: body,
    });
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
  }
}