drop table if exists account
cascade;

drop table if exists payment_history
cascade;

drop table if exists role
cascade;

create table account
(
    account_id serial,
    username varchar(50) unique ,
    password varchar(100),
    role real default 3,
    
    account_balance bigint default 0,
    state varchar(50) default 'unlock',
    primary key (username)
       constraint fk_acc_role
        foreign key (role_id) references role

);

create table payment_history (
    payment_his_id serial,
    username varchar(50),
    total_money real,
    payment_time timestamp,
    package_name varchar(100)
    constraint fk_pm_his_acc
        foreign key (username) references account
)

create table role
(
    role_id serial,
    role_name varchar(50),
    primary key (role_id)
);





insert into account(username,password,role) values('admin','','admin');
insert into account(username,password) values('123456789','');
insert into account(username,password) values('12345678','');