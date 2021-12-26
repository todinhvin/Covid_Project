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

create table role
(
    role_id serial,
    role_name varchar(50),
    primary key (role_id)
);

create table indept
(
    indept_id serial,
    indept real,
    due_date timestamp,
    minimum_pay real,
    primary key (indept_id)
);

create table account
(
    account_id serial,
    username varchar(50),
    password varchar(100),
    status varchar(100),
    role_id serial,
    person_id integer,
    indebt_id integer,
    primary key (account_id),
    constraint fk_acc_role
        foreign key (role_id) references role
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
    primary key
    (item_id),
    constraint fk_item_manager
        foreign key
    (manager_id) references account
);

    create table package
    (
        package_id serial,
        name varchar(50),
        due_date timestamp,
        created_on timestamp,
        manager_id serial,
        primary key (package_id),
        constraint fk_package_manager
        foreign key (manager_id) references account
    );

    create table payment_history
    (
        payment_history_id serial,
        account_id serial,
        payment_on timestamp,
        total_money real,
        primary key (payment_history_id),
        constraint fk_payhis_acc
        foreign key (account_id) references account
    );

    create table account_payment
    (
        account_payment_id serial,
        password serial,
        account_id serial,
        balance real,
        primary key (account_payment_id),
        constraint fk_accpay_acc
        foreign key (account_id) references account
    );

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
        constraint fk_related
        foreign key (related_person_id) references person,
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
        item_id serial,
        checkout_date timestamp,
        state boolean,
        payment_history_id integer,
        quantity integer,
        primary key (checkout_id),
        constraint fk_checkout_account
        foreign key (account_id) references account,
        constraint fk_checkout_package
        foreign key (package_id) references package,
        constraint fk_checkout_item
        foreign key (item_id) references item,
        constraint fk_checkout_payment_history
        foreign key (payment_history_id) references payment_history
    );


insert into role
        ( role_name)
    values
        ( 'Admin');
    insert into role
        ( role_name)
    values
        ('Manager');
    insert into role
        (role_name)
    values
        ('Customer');

    -- Account
    -- ALTER TABLE account ALTER COLUMN person_id  DROP NOT NULL;
    -- ALTER TABLE account ALTER COLUMN indebt_id  DROP NOT NULL;

    insert into account
        ( username, password, status, role_id, person_id)
    values
        ( 'admin', '123456', 'active', 1, null);
    insert into account
        ( username, password, status, role_id, person_id)
    values
        ( 'manager', '123456', 'active', 2, null);


    -- Address
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cau Ngang', 'Vinh Kim', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Di An', 'Dong Hoa', 2);

    -- Treatment place
    insert into treatment
        ( name, capacity, manager_id)
    values
        ( 'KTX DHQG', 20000, 2);
    insert into treatment
        ( name, capacity, manager_id)
    values
        ( 'Benh Vien', 3000, 2);

    -- Person
    -- ALTER TABLE person ALTER COLUMN related_person_id  DROP NOT NULL;

    insert into person
        ( full_name, cccd, birthday, address_id, related_person_id, treatment_id, status,
        manager_id)
    values
        ( 'Nguyen van customer', '0011223344', '2000-1-1', 1, null, 1, 'f0', 2);

    insert into person
        ( full_name, cccd, birthday, address_id, related_person_id, treatment_id, status,
        manager_id)
    values
        ( 'Pham Thi customer', '999993344', '2001-1-1', 1, 1, 1, 'f1', 2);

    -- Treatment history
    insert into treatment_history
        ( treatment_id, person_id, "time", manager_id)
    values
        ( 1, 1, '2021-01-01', 2);
    insert into treatment_history
        ( treatment_id, person_id, "time", manager_id)
    values
        ( 2, 1, '2020-12-31', 2);
    insert into treatment_history
        ( treatment_id, person_id, "time", manager_id)
    values
        ( 1, 2, '2021-12-31', 2);

    -- Status history
    insert into status_history
        ( person_id, status, "time", manager_id)
    values
        ( 1, 'f0', '2021-01-01', 2);
    insert into status_history
        ( person_id, status, "time", manager_id)
    values
        ( 2, 'f1', '2021-12-01', 2);

    -- Item
    insert into item
        ( name, image, price, unit, created_on, manager_id)
    values
        ( 'Xoai', null, 10000, 'kg', '2021-12-25', 2);
    insert into item
        ( name, image, price, unit, created_on, manager_id)
    values
        ( 'Dua', null, 10000, 'trai', '2021-12-25', 2);
    insert into item
        ( name, image, price, unit, created_on, manager_id)
    values
        ( 'Mang cau', null, 30000, 'kg', '2021-12-25', 2);

    insert into item
        ( name, image, price, unit, created_on, manager_id)
    values
        ( 'Thit heo', null, 100000, 'kg', '2021-12-25', 2);
    insert into item
        ( name, image, price, unit, created_on, manager_id)
    values
        ( 'Ca', null, 120000, 'kg', '2021-12-25', 2);
    insert into item
        ( name, image, price, unit, created_on, manager_id)
    values
        ( 'Thit bo', null, 200000, 'kg', '2021-12-25', 2);

    -- Package
    insert into package
        ( name, due_date, created_on, manager_id)
    values
        ( 'Trai cay pack', '2022-02-02', '2021-12-25', 2);
    insert into package
        (name, due_date, created_on, manager_id)
    values
        ( 'Dong vat pack', '2022-02-02', '2021-12-25', 2);

    -- Package item
    insert into package_item
        (package_id, item_id, quantity, item_limit)
    values
        (1, 1, 1, 2);
    insert into package_item
        (package_id, item_id, quantity, item_limit)
    values
        (1, 2, 1, 2);
    insert into package_item
        (package_id, item_id, quantity, item_limit)
    values
        (1, 3, 1, 2);

    insert into package_item
        (package_id, item_id, quantity, item_limit)
    values
        (2, 4, 1, 4);
    insert into package_item
        (package_id, item_id, quantity, item_limit)
    values
        (2, 5, 1, 2);
    insert into package_item
        (package_id, item_id, quantity, item_limit)
    values
        (2, 6, 1, 5);


    -- In debt
    -- alter table indept drop column  account_id;
    insert into indept
        ( indept, due_date, minimum_pay)
    values
        ( 0, '2022-01-01', 20000);
    insert into indept
        ( indept, due_date, minimum_pay)
    values
        ( 420000, '2022-01-01', 20000);

    -- user
    insert into account
        ( username, password, status, role_id, person_id, indebt_id)
    values
        ( 'user1', '123456', 'active', 3, 1, 1);
    insert into account
        ( username, password, status, role_id, person_id, indebt_id)
    values
        ( 'user2', '123456', 'active', 3, 2, 2);

    -- Checkout
    -- alter table checkout alter column payment_history_id drop not null;
    -- alter table checkout add column quantity int;
    insert into checkout
        ( account_id, package_id, item_id, checkout_date, state, payment_history_id, quantity)
    values
        ( 4, 2, 4, '2021-12-25', false, null, 1);
    insert into checkout
        ( account_id, package_id, item_id, checkout_date, state, payment_history_id, quantity)
    values
        ( 4, 2, 5, '2021-12-25', false, null, 1);
    insert into checkout
        ( account_id, package_id, item_id, checkout_date, state, payment_history_id, quantity)
    values
        ( 4, 2, 6, '2021-12-25', false, null, 1);

    -- Account payment
    insert into account_payment
        ( password, account_id, balance)
    values
        ( '123456', 3, 2000000);
    insert into account_payment
        ( password, account_id, balance)
    values
        ( '123456', 4, 200000);


