import { CronJob } from 'cron';
import type LoggerService from '../services/logger.service';

export default abstract class JobsBase {
  public runOnStart = true;

  protected readonly _logger: LoggerService;
  protected abstract cronTime: string;

  private _job: CronJob;

  constructor(
    logger: LoggerService,
  ) {
    this._logger = logger.createChild(this.constructor.name);
  }

  protected abstract onTick(): Promise<void>;

  initialize() {
    this._job = CronJob.from(this.buildConfig());
  }

  start() {
    this._logger.info('Starting job');
    this._job.start();
  }

  stop(): void {
    this._logger.info('Stopping job');
    this._job.stop();
  }

  getJobName() {
    return this.constructor.name;
  }

  isRunning() {
    return this._job.running;
  }

  protected async onTickWrapper() {
    const start = Date.now();

    try {
      this._logger.info('Job started');
      await this.onTick();
    } catch (error) {
      this._logger.logError(error);
    } finally {
      this._logger.info(`Job finished. Execution time: ${Date.now() - start}ms`);
    }
  }

  protected buildConfig() {
    return {
      cronTime: this.cronTime,
      onTick: this.onTickWrapper.bind(this),
    };
  }
}
