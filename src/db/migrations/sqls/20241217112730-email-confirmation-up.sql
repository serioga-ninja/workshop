alter table users
  add column email_confirmed_at timestamp,
  add column email_confirmation_token varchar(30);
