drop table if exists account
cascade;

drop table if exists account_payment
cascade;

drop table if exists address
cascade;

drop table if exists checkout
cascade;

drop table if exists indept
cascade;

drop table if exists item
cascade;

drop table if exists package
cascade;

drop table if exists package_item
cascade;

drop table if exists payment_history
cascade;

drop table if exists person
cascade;

drop table if exists role
cascade;

drop table if exists status_history
cascade;

drop table if exists treatment
cascade;

drop table if exists treatment_history
cascade;

drop table if exists checkout_item
cascade;

create table role
(
    role_id serial,
    role_name varchar(50),
    primary key (role_id)
);

create table account
(
    account_id serial,
    username varchar(50) unique ,
    password varchar(100),
    status varchar(100),
    role_id serial,
    person_id integer,
    primary key (account_id),
    constraint fk_acc_role
        foreign key (role_id) references role
);

create table indept
(
    indept_id serial,
    indept real,
    due_date timestamp,
    account_id serial,
    minimum_pay real,
    state boolean,
    primary key (indept_id),
    constraint fk_indept_account
        foreign key (account_id) references account
);

create table item
(
    item_id serial,
    name varchar(50),
    image varchar(255)
    [],
    price      real,
    unit       varchar
    (50),
    created_on timestamp,
    manager_id serial,
    state boolean,
    primary key
    (item_id),
    constraint fk_item_manager
        foreign key
    (manager_id) references account
);

    create table package
    (
        package_id serial,
        name varchar(100),
        due_date timestamp,
        created_on timestamp,
        manager_id serial,
        state boolean,
        primary key (package_id),
        constraint fk_package_manager
        foreign key (manager_id) references account
    );


    -- create table account_payment
    -- (
    --     account_payment_id serial,
    --     password varchar(100),
    --     account_id serial,
    --     balance real,
    --     primary key (account_payment_id),
    --     constraint fk_accpay_acc
    --     foreign key (account_id) references account
    -- );

    create table treatment
    (
        treatment_id serial,
        name varchar(50),
        capacity integer,
        manager_id serial,
        primary key (treatment_id),
        constraint fk_treat_acc
        foreign key (manager_id) references account
    );

    create table address
    (
        address_id serial,
        tinh varchar(100),
        huyen varchar(100),
        xa varchar(100),
        manager_id serial,
        primary key (address_id),
        constraint fk_manager
        foreign key (manager_id) references account
    );

    create table person
    (
        person_id serial,
        full_name varchar(50),
        cccd varchar(20),
        birthday date,
        address_id serial,
        related_person_id integer,
        treatment_id serial,
        status varchar(255),
        manager_id serial,
        primary key (person_id),
        constraint fk_manager
        foreign key (manager_id) references account,
        constraint fk_treat
        foreign key (treatment_id) references treatment,
        constraint fk_address
        foreign key (address_id) references address
    );

    alter table account
    add constraint fk_acc_person
        foreign key (person_id) references person;

    create table treatment_history
    (
        treatment_history_id serial,
        treatment_id serial,
        person_id serial,
        time timestamp,
        manager_id serial,
        primary key (treatment_history_id),
        constraint fk_treathis_treat
        foreign key (treatment_id) references treatment,
        constraint fk_treathis_person
        foreign key (person_id) references person,
        constraint fk_treat_manager
        foreign key (manager_id) references account
    );

    create table status_history
    (
        status_history_id serial,
        person_id serial,
        status varchar(255),
        time timestamp,
        manager_id serial,
        primary key (status_history_id),
        constraint fk_stat_person
        foreign key (person_id) references person,
        constraint fk_stat_manager
        foreign key (manager_id) references account
    );

    create table package_item
    (
        package_id serial,
        item_id serial,
        quantity integer,
        item_limit integer,
        primary key (package_id, item_id),
        constraint fk_pi_package
        foreign key (package_id) references package,
        constraint fk_pi_item
        foreign key (item_id) references item
    );

    create table checkout
    (
        checkout_id serial,
        account_id serial,
        package_id serial,
        checkout_date timestamp,
        state boolean,
        primary key (checkout_id),
        constraint fk_checkout_account
        foreign key (account_id) references account,
        constraint fk_checkout_package
        foreign key (package_id) references package
--         constraint fk_checkout_item
--         foreign key (item_id) references item,
--         constraint fk_checkout_payment_history
--         foreign key (payment_history_id) references payment_history
    );

    create table payment_history
    (
        payment_history_id serial,
        account_id serial,
        payment_on timestamp,
        checkout_id integer null ,
        total_money real,
        primary key (payment_history_id),
        constraint fk_payhis_acc
        foreign key (account_id) references account,
        constraint fk_payhis_ck
        foreign key (checkout_id) references checkout
    );
    create table checkout_item (
        checkout_item_id serial,
        checkout_id integer,
        item_id integer,
        user_quantity integer,

        primary key (checkout_item_id),
        constraint fk_ckit_ck
        foreign key (checkout_id) references checkout,
        constraint fk_ckit_it
        foreign key (item_id) references item
    );
alter table treatment alter column manager_id drop not null;
Alter TABLE Person ALTER COLUMN related_person_id DROP not NULL;
