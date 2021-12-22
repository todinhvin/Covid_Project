create table role
(
    role_id   varchar(40) not null,
    role_name varchar(50),
    constraint role_pkey
        primary key (role_id)
);

create table indept
(
    indept_id   varchar(40) not null,
    indept      real,
    due_date    timestamp,
    minimum_pay real,
    account_id  varchar(40),
    constraint indept_pkey
        primary key (indept_id)
);

create table account
(
    account_id varchar(40) not null,
    username   varchar(50),
    password   varchar(100),
    status     varchar(40),
    role_id    varchar(40),
    indebt_id  varchar(40),
    person_id  varchar(40),
    constraint account_pkey
        primary key (account_id),
    constraint fk_acc_role
        foreign key (role_id) references role,
    constraint fk_acc_debt
        foreign key (indebt_id) references indept
);

create table item
(
    item_id    varchar(40) not null,
    name       varchar(50),
    image      varchar(255)[],
    price      real,
    unit       varchar(50),
    created_on timestamp,
    manager_id varchar(40),
    constraint item_pkey
        primary key (item_id),
    constraint fk_item_manager
        foreign key (manager_id) references account
);

create table package
(
    package_id varchar(40) not null,
    name       varchar(50),
    due_date   timestamp,
    created_on timestamp,
    manager_id varchar(40),
    constraint package_pkey
        primary key (package_id),
    constraint fk_package_manager
        foreign key (manager_id) references account
);

create table payment_history
(
    payment_history_id varchar(40) not null,
    account_id         varchar(40),
    payment_on         timestamp,
    total_money        real,
    constraint payment_history_pkey
        primary key (payment_history_id),
    constraint fk_payhis_acc
        foreign key (account_id) references account
);

create table account_payment
(
    account_payment_id varchar(40) not null,
    password           varchar(40),
    account_id         varchar(40),
    balance            real,
    constraint account_payment_pkey
        primary key (account_payment_id),
    constraint fk_accpay_acc
        foreign key (account_id) references account
);

create table treatment
(
    treatment_id varchar(40) not null,
    name         varchar(50),
    capacity     integer,
    manager_id   varchar(40),
    constraint treatment_pkey
        primary key (treatment_id),
    constraint fk_treat_acc
        foreign key (manager_id) references account
);

create table address
(
    address_id varchar(40) not null,
    tinh       varchar(40),
    huyen      varchar(40),
    xa         varchar(40),
    manager_id varchar(40),
    constraint address_pkey
        primary key (address_id),
    constraint fk_manager
        foreign key (manager_id) references account
);

create table person
(
    person_id         varchar(40) not null,
    full_name         varchar(50),
    cccd              varchar(20),
    birthday          date,
    address_id        varchar(40),
    related_person_id varchar(40),
    treatment_id      varchar(40),
    status            varchar(255),
    manager_id        varchar(40),
    constraint person_pkey
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
    treatment_history_id varchar(40) not null,
    treatment_id         varchar(40),
    person_id            varchar(40),
    time                 timestamp,
    manager_id           varchar(40),
    constraint treatment_history_pkey
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
    status_history_id varchar(40) not null,
    person_id         varchar(40),
    status            varchar(255),
    time              timestamp,
    manager_id        varchar(40),
    constraint status_history_pkey
        primary key (status_history_id),
    constraint fk_stat_person
        foreign key (person_id) references person,
    constraint fk_stat_manager
        foreign key (manager_id) references account
);

create table package_item
(
    package_id varchar(40) not null,
    item_id    varchar(40) not null,
    quantity   integer,
    item_limit integer,
    constraint package_item_pkey
        primary key (package_id, item_id),
    constraint fk_pi_package
        foreign key (package_id) references package,
    constraint fk_pi_item
        foreign key (item_id) references item
);

create table checkout
(
    checkout_id        varchar(40) not null,
    account_id         varchar(40),
    package_id         varchar(40),
    item_id            varchar(40),
    checkout_date      timestamp,
    state              boolean,
    payment_history_id varchar(40),
    constraint checkout_pkey
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

