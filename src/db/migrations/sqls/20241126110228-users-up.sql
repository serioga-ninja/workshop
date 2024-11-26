create type user_role as enum ('admin', 'user', 'author');

create table users (
    id uuid primary key default gen_random_uuid(),
    first_name varchar(20) not null,
    last_name varchar(20) not null,
    email varchar(255) not null unique,
    role user_role not null default 'user',
    password varchar(255) not null,
    salt varchar(255) not null,
    entity_status entity_status not null default 'active',
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);

alter table articles
    add column created_by_id uuid references users(id) on delete set null;
