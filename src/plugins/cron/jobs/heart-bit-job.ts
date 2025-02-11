import { singleton } from 'tsyringe';
import JobsBase from '../../../common/classes/jobs-base';
import LoggerService from '../../../common/services/logger.service';

@singleton()
export default class HeartBitJob extends JobsBase {
  cronTime = '* * * * * *'; // Every second

  constructor(logger: LoggerService) {
    super(logger);
  }

  override async onTick(): Promise<void> {
    this._logger.info('Cron job is running');
  }
}
