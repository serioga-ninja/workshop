import 'reflect-metadata';

import type { Express } from 'express';
import * as express from 'express';
import * as http from 'node:http';
import { container, injectable } from 'tsyringe';
import * as WebSocket from 'ws';
import LoggerService from '../common/services/logger.service';
import config from '../config';
import MongoConnection from '../db/mongo';
import { createPGConnection } from '../db/typeorm';
import ChatSessionsService from '../plugins/chat/services/chat-sessions.service';

@injectable()
export default class WSServer {
  app: Express;
  html?: string;

  constructor(
    private readonly _mongoConnection: MongoConnection,
    private readonly _logger: LoggerService,
    private readonly _chatSessionsService: ChatSessionsService,
  ) {
    this.app = express();
  }

  async register() {
    const port = config.WS_PORT;

    await Promise.all([
      createPGConnection(),
      this._mongoConnection.createMongoConnection(),
    ]);

    const server = http.createServer(this.app);
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws: WebSocket, req) => {
      if (!req.url) return;

      const { pathname } = new URL(req.url, config.APP_URL);

      if (pathname.startsWith('/session')) {
        const [, , sessionId, userId] = pathname.split('/');

        if (!sessionId || !userId || userId.length !== 36) return;

        this._chatSessionsService.handleNewUser(ws, sessionId, userId);
      }
    });

    return await new Promise<void>(resolve => {
      server.listen(
        port,
        () => {
          this._logger.info(`Server running on port: ${port}. Open http://localhost:${port} to see the app`);
          resolve();
        },
      );
    });
  }
}

const server = container.resolve(WSServer);
server.register();
