import { singleton } from 'tsyringe';
import JobsBase from '../../../common/classes/jobs-base';
import LoggerService from '../../../common/services/logger.service';

@singleton()
export default class CancelUserSubscription extends JobsBase {
  public override runOnStart = false;

  cronTime = '0 22 */1 * *'; // Every day at 10 PM

  constructor(logger: LoggerService) {
    super(logger);
  }

  override async onTick(): Promise<void> {
    this._logger.info('User subscription is cancelled');
  }
}
