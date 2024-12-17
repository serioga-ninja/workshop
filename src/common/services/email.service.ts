import { injectable } from 'tsyringe';
import type { MailgunMessageData } from 'mailgun.js';
import LoggerService from './logger.service';
import mg from '../../libs/mailgun';
import config from '../../config';

const { MAILGUN_DOMAIN, MAILGUN_EMAIL_FROM } = config;

@injectable()
export default class EmailService {
  private readonly _logger: LoggerService;

  constructor(
    _logger: LoggerService,
  ) {
    this._logger = _logger.createChild('EmailService');
  }

  async sendEmail(params: MailgunMessageData) {
    try {
      await mg.messages.create(MAILGUN_DOMAIN, {
        template: params.template as string,
        ...params,
        from: params.from || MAILGUN_EMAIL_FROM,
      });
    } catch (error) {
      this._logger.logError(error);
    }
  }
}
