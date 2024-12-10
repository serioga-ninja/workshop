import 'reflect-metadata';

import { container } from 'tsyringe';
import Server from './src/server';

const server = container.resolve(Server);
server.register();
