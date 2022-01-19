drop table if exists account
cascade;

create table account
(
    username varchar(50) unique ,
    password varchar(100),
    role varchar(50),
    account_balance bigint,
    primary key (username)
);


-- insert into account(username,password,role) values('admin','')