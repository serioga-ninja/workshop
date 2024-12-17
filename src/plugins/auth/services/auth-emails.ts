import { singleton } from 'tsyringe';
import EmailService from '../../../common/services/email.service';
import config from '../../../config';
import SignUp, { type SignUpEventData } from './sign-up';
import type { Observer } from '../../../common/types/observer';
import LoggerService from '../../../common/services/logger.service';

const { APP_URL } = config;

@singleton()
export default class AuthEmails implements Observer {
  private readonly _logger: LoggerService;

  constructor(
    private readonly _emailService: EmailService,
    private readonly _signUp: SignUp,
    _logger: LoggerService,
  ) {
    this._logger = _logger.createChild('AuthEmails');
  }

  load() {
    this._signUp.on(SignUp.EVENT_USER_SIGNED_UP, this.sendConfirmationEmail.bind(this));
  }

  unload() {
    this._signUp.off(SignUp.EVENT_USER_SIGNED_UP, this.sendConfirmationEmail.bind(this));
  }

  sendConfirmationEmail({ user }: SignUpEventData) {
    const { email, emailConfirmationToken } = user;
    this._logger.info(`Sending confirmation email to: ${email}`);

    const url = `${APP_URL}/api/auth/confirm-email?token=${emailConfirmationToken}&email=${email}`;

    this._emailService.sendEmail({
      to: email,
      subject: 'Confirm your email',
      html: `
        <h1>Confirm your email</h1>
        <p>Click <a href="${url}">here</a> to confirm your email</p>
        <p>Or use the following code: ${emailConfirmationToken}</p>
      `,
    });
  }
}
