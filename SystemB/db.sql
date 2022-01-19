drop table if exists account
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




insert into account(username,password,role) values('admin','','admin');
insert into account(username,password) values('123456789','');
insert into account(username,password) values('12345678','');