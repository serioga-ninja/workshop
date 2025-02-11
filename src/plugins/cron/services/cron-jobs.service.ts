import { singleton } from 'tsyringe';
import type JobsBase from '../../../common/classes/jobs-base';
import LoggerService from '../../../common/services/logger.service';
import { HeartBitJob, CancelUserSubscription } from '../jobs';

@singleton()
export default class CronJobsService {
  private readonly _cronJobs: JobsBase[];

  constructor(
    private readonly _logger: LoggerService,
    heartbeatJob: HeartBitJob,
    cancelUserSubscription: CancelUserSubscription,
  ) {
    this._cronJobs = [
      heartbeatJob,
      cancelUserSubscription,
    ];
  }

  start() {
    this._logger.info('Starting cron tasks runner');
    this._cronJobs.forEach(job => job.initialize());

    this._cronJobs
      .filter(job => job.runOnStart)
      .forEach(job => job.start());
  }

  getJobs() {
    return this._cronJobs;
  }
}
