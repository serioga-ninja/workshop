alter table files
    add column meta jsonb not null default '{}';
