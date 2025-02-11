import { injectable } from 'tsyringe';
import { WebSocket } from 'ws';
import LoggerService from '../../../common/services/logger.service';
import UsersRepository from '../../users/repositories/users.repository';
import type { Users } from '../../../db';

type Session = {
  sessionId: string;
  clients: {
    userId: string;
    name: string;
    ws: WebSocket;
  }[];
};

@injectable()
export default class ChatSessionsService {
  private _sessions: Map<string, Session> = new Map();
  private readonly _logger: LoggerService;

  constructor(
    logger: LoggerService,
    private readonly _usersRepo: UsersRepository,
  ) {
    this._logger = logger.createChild('ChatSessionsService');
  }

  async handleNewUser(ws: WebSocket, sessionId: string, userId: string) {
    this._logger.info(`New user with id ${userId} connected to session: ${sessionId}`);

    const session = this._sessions.get(sessionId)
      || ({
        sessionId,
        clients: [],
      } as Session);
    const user = await this._usersRepo.findOneByOrFail({ id: userId });

    session.clients.push({
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      ws,
    });

    this._sessions.set(sessionId, session);

    ws.on('message', (message: Buffer) => {
      this._logger.info(`Message received from user: ${userId}`);

      this._handleMessage(message.toString('utf-8'), sessionId, user);
    });

    ws.on('close', () => {
      this._logger.info(`User disconnected from session: ${sessionId}`);

      this._handleClose(sessionId, userId);
    });
  }

  private _handleClose(sessionId: string, userId: string) {
    const session = this._sessions.get(sessionId);

    if (!session) {
      return;
    }

    const newSession = {
      ...session,
      clients: session.clients.filter((client) => client.userId !== userId),
    };

    if (newSession.clients.length === 0) {
      this._sessions.delete(sessionId);
    } else {
      this._sessions.set(sessionId, newSession);
    }
  }

  private _handleMessage(message: string, sessionId: string, user: Users) {
    const session = this._sessions.get(sessionId);

    if (!session) {
      return;
    }

    session.clients.forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(
          JSON.stringify({
            name: `${user.firstName} ${user.lastName}`,
            message,
          }),
        );
      }
    });
  }
}
