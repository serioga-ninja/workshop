import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';
import config from '../../config';

const { MAILGUN_API_KEY } = config;

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({ username: 'api', key: MAILGUN_API_KEY });

export type MailgunClient = typeof mg;

export default mg;
