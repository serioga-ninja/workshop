create table files (
    id uuid primary key default uuid_generate_v4(),
    name varchar(255) not null,
    path varchar(255) not null,
    size integer not null,
    type varchar(20) not null,
    parent_id uuid,
    entity_status entity_status not null default 'active',
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

alter table users
    add column avatar_id uuid references files(id) on delete set null;
