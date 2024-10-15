import * as Transport from 'winston-transport';
import type { TAny } from '../../../common/types';
import LogsModel from '../../../db/models/log.model';

export default class MongoTransport extends Transport {
  public override log(info: TAny, next: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const { message, level, ...payload } = info;

    new LogsModel({
      message,
      level,
      payload,
    }).save();

    next();
  }
}
