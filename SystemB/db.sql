drop table if exists account
cascade;

drop table if exists payment_history
cascade;

drop table if exists role
cascade;

create table role
(
    role_id integer,
    role_name varchar(50),
    primary key (role_id)
);

create table account
(
    account_id serial,
    username varchar(50) unique ,
    password varchar(100),
    role integer default 3,
    account_balance bigint default 0,
    state varchar(50) default 'unlock',
    primary key (username),
       constraint fk_acc_role
        foreign key (role) references role
);

create table payment_history (
    payment_his_id serial,
    account_id varchar(50),
    total_money real,
    payment_time timestamp,
    constraint fk_pm_his_acc
        foreign key (account_id) references account
);

insert into role
        ( role_id, role_name)
    values
        (1,  'Admin');
insert into role
        (role_id, role_name)
    values
        (3, 'Customer');

insert into account
        ( username, password, role, account_balance, state)
    values
        ( 'admin', '$2b$10$5Uvopx3l2ILJYc4WSavvduC3WTFBgLjxV52SXomceckmgPEKsASnC', 1, 0, 'unlock');
insert into account
        ( username, password, role, account_balance, state)
    values
        ( '123456789', '$2b$10$5Uvopx3l2ILJYc4WSavvduC3WTFBgLjxV52SXomceckmgPEKsASnC', 3, 0, 'unlock');
insert into account
        ( username, password, role, account_balance, state)
    values
        ( '12345678', '$2b$10$5Uvopx3l2ILJYc4WSavvduC3WTFBgLjxV52SXomceckmgPEKsASnC', 3, 0, 'unlock');