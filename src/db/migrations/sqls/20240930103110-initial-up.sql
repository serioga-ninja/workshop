/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE entity_status AS ENUM (
    'active',
    'draft',
    'deleted'
);

create table articles (
  id uuid primary key,
  title text not null,
  content text not null,
  entity_status entity_status default 'draft',
  created_at timestamp not null,
  updated_at timestamp not null
);
