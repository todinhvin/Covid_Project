drop table if exists account
cascade;

drop table if exists payment_history
cascade;


create table account
(
    username varchar(50) unique ,
    password varchar(100),
    role varchar(50) default 'user',
    account_balance bigint default 0,
    state varchar(50) default 'unlock',
    primary key (username)

);

create table payment_history (
    payment_his_id serial,
    username varchar(50),
    total_money real,
    payment_time datetime,
    package_name varchar(100)
    constraint fk_pm_his_acc
        foreign key (username) references account
)




insert into account(username,password,role) values('admin','','admin');
insert into account(username,password) values('123456789','');
insert into account(username,password) values('12345678','');