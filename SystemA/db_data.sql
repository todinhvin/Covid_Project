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
    -- ALTER TABLE account ALTER COLUMN indept_id  DROP NOT NULL;

    insert into account
        ( username, password, status, role_id, person_id)
    values
        ( 'admin', '$2b$10$5Uvopx3l2ILJYc4WSavvduC3WTFBgLjxV52SXomceckmgPEKsASnC', 'active', 1, null);
    insert into account
        ( username, password, status, role_id, person_id)
    values
        ( 'manager', '$2b$10$5Uvopx3l2ILJYc4WSavvduC3WTFBgLjxV52SXomceckmgPEKsASnC', 'active', 2, null);

    -- Address
    -- * Tra Vinh
    -- ** Cau Ngang
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cau Ngang', 'Vinh Kim', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cau Ngang', 'Kim Hoa', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cau Ngang', 'My Hoa', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cau Ngang', 'Hiep My Tay', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cau Ngang', 'Hiep My Dong', 2);

    -- ** Chau Thanh
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Chau Thanh', 'Da Loc', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Chau Thanh', 'Hoa Loi', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Chau Thanh', 'Hoa Minh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Chau Thanh', 'Hoa Thuan', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Chau Thanh', 'Phuoc Hao', 2);
    
    -- ** Cau Ke
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cau Ke', 'Phong Phu', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cau Ke', 'Phong Thanh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cau Ke', 'Thanh Phu', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cau Ke', 'Phu Tan', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cau Ke', 'Thong Hoa', 2);

    -- ** Cang Long
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cang Long', 'Nhi Long', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cang Long', 'Nhi Long Phu', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cang Long', 'An Truong', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cang Long', 'An Truong A', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Cang Long', 'My Cam', 2);

    -- ** Duyen Hai
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Duyen Hai', 'Don Chau', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Duyen Hai', 'Don Xuan', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Duyen Hai', 'Long Vinh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Duyen Hai', 'Long Khanh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ('Tra Vinh', 'Duyen Hai', 'Dong Hai', 2);

    -- * Binh Duong
    -- ** Di An
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Di An', 'Dong Hoa', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Di An', 'An Binh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Di An', 'Binh Thang', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Di An', 'Tan Binh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Di An', 'Tan Dong Hiep', 2);

    -- ** Tan Uyen
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Tan Uyen', 'Thai Hoa', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Tan Uyen', 'Phu Chanh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Tan Uyen', 'Tan Hiep', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Tan Uyen', 'Vinh Tan', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Tan Uyen', 'Bach Dang', 2);

    -- ** Ben Cat
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Ben Cat', 'Hoa Loi', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Ben Cat', 'An Dien', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Ben Cat', 'An Tay', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Ben Cat', 'Phu An', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Ben Cat', 'Tan Dinh', 2);

     -- ** Bau Bang
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Bau Bang', 'Long Nguyen', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Bau Bang', 'Lai Uyen', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Bau Bang', 'Hung Hoa', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Bau Bang', 'Lai Hung', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Bau Bang', 'Tan Hung', 2);

    -- ** Phu Giao
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Phu Giao', 'An Binh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Phu Giao', 'An Linh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Phu Giao', 'An Long', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Phu Giao', 'An Thai', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Duong', 'Phu Giao', 'Phuoc Sang', 2);

    -- * Binh Phuoc
    -- ** 1 Bu Dang
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Dang', 'Binh Minh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Dang', 'Nghia Binh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Dang', 'Phu Son', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Dang', 'Phuoc Son', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Dang', 'Dong Nai', 2);

    -- ** 2 Bu Dop
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Dop', 'Thanh Binh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Dop', 'Hung Phuoc', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Dop', 'Thien Hung', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Dop', 'Tan Thanh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Dop', 'Phuoc Thien', 2);

    -- ** 3 Bu Gia Map
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Gia Map', 'Binh Thang', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Gia Map', 'Phuoc Minh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Gia Map', 'Da Kia', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Gia Map', 'Dak O', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Bu Gia Map', 'Bu Gia Map', 2);
    
    -- ** 4 Binh Long
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Binh Long', 'Thanh Phu', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Binh Long', 'Thanh Luong', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Binh Long', 'Thanh Binh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Binh Long', 'Phu Thinh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Binh Long', 'Phu Duc', 2);
    
     -- ** 5 Phuoc Long
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Phuoc Long', 'Long Phuoc', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Phuoc Long', 'Long Thuy', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Phuoc Long', 'Phuoc Tin', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Phuoc Long', 'Long Giang', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Binh Phuoc', 'Phuoc Long', 'Son Giang', 2);

    --  * Can Tho
    -- ** 1 Binh Thuy
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Binh Thuy', 'An Thoi', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Binh Thuy', 'Binh Thuy', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Binh Thuy', 'Long Hoa', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Binh Thuy', 'Long Tuyen', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Binh Thuy', 'Tra An', 2);

    -- ** 2 Cai Rang
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Cai Rang', 'Hung Phu', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Cai Rang', 'Hung Thanh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Cai Rang', 'Tan Phu', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Cai Rang', 'Ba Lang', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Cai Rang', 'Le Binh', 2);

    -- ** 3 O Mon
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'O Mon', 'Thoi An', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'O Mon', 'Thoi Hoa', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'O Mon', 'Thoi Long', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'O Mon', 'Phuoc Thoi', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'O Mon', 'Truong Lac', 2);

     -- ** 4 Co Do
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Co Do', 'Thoi Dong', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Co Do', 'Thoi Hung', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Co Do', 'Thoi Xuan', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Co Do', 'Dong Hiep', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Co Do', 'Co Do', 2);

     -- ** 5 Thoi Lai
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Thoi Lai', 'Thoi Lai', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Thoi Lai', 'Thoi Tan', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Thoi Lai', 'Thoi Thanh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Thoi Lai', 'Truong Thang', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Can Tho', 'Thoi Lai', 'Truong Thanh', 2);
    
    -- * Vinh Long
    -- ** 1 Binh Tan
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Binh Tan', 'Tan Binh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Binh Tan', 'Tan Hung', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Binh Tan', 'Tan Luoc', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Binh Tan', 'Tan Quoi', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Binh Tan', 'Tan Thanh', 2);
    -- ** 2 Long Ho
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Long Ho', 'Phu Duc', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Long Ho', 'Phu Quoi', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Long Ho', 'Long Phuoc', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Long Ho', 'Tan Thanh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Long Ho', 'Thanh Duc', 2);
    -- ** 3 Tra On
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Tra On', 'Tra Con', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Tra On', 'Nhon Thanh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Tra On', 'Tan My', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Tra On', 'Huu Thanh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Tra On', 'Tich Thien', 2);

     -- ** 4 Vung Liem
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Vung Liem', 'Trung Chanh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Vung Liem', 'Trung Hiep', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Vung Liem', 'Trung Hieu', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Vung Liem', 'Trung Nghia', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Vung Liem', 'Trung Ngai', 2);

    -- ** 5 Binh Minh
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Binh Minh', 'Dong Binh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Binh Minh', 'Dong Thanh', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Binh Minh', 'Dong Thuan', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Binh Minh', 'Cai Von', 2);
    insert into address
        ( tinh, huyen, xa, manager_id)
    values
        ( 'Vinh Long', 'Binh Minh', 'Thuan An', 2);

    -- Treatment place
    insert into treatment
        ( name, capacity, manager_id)
    values
        ( 'KTX DHQG, Di An, Binh Duong', 2000, 2);
    insert into treatment
        ( name, capacity, manager_id)
    values
        ( 'Truong THPT Duong Quang Dong, Cau Ngang, Tra Vinh', 100, 2);
    insert into treatment
        ( name, capacity, manager_id)
    values
        ( 'Benh Vien Da Chien 06, Trung doan 932, Can Tho', 150, 2);
    insert into treatment
        ( name, capacity, manager_id)
    values
        ( '112, Dinh Tien Hoang, p.8, TP.Vinh Long', 90, 2);
    insert into treatment
        ( name, capacity, manager_id)
    values
        ( 'Dai doi BB 10/ Bu Dop, Binh Phuoc', 200, 2);

    -- Person
    -- ALTER TABLE person ALTER COLUMN related_person_id  DROP NOT NULL;

    insert into person
        ( full_name, cccd, birthday, address_id, related_person_id, treatment_id, status,
        manager_id)
    values
        ( 'Nguyen van customer', '0011223344', '2000-1-1', 1, -1, 1, 'F0', 2);

    insert into person
        ( full_name, cccd, birthday, address_id, related_person_id, treatment_id, status,
        manager_id)
    values
        ( 'Pham Thi customer', '999993344', '2001-1-1', 1, 1, 1, 'F1', 2);

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
        ( 1, 'F0', '2021-01-01', 2);
    insert into status_history
        ( person_id, status, "time", manager_id)
    values
        ( 2, 'F1', '2021-12-01', 2);

    -- Item
    insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Xoai', null, 10000, 'kg', '2021-12-25', 2, true);
    insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Dua', null, 10000, 'kg', '2021-12-25', 2, true);
    insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Mang cau', null, 30000, 'kg', '2021-12-25', 2, true);

    insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Thit heo', null, 100000, 'kg', '2021-12-25', 2, true);
    insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Ca', null, 120000, 'kg', '2021-12-25', 2, true);
    insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Thit bo', null, 200000, 'kg', '2021-12-25', 2, true);

    -- Package
    insert into package
        ( name, due_date, created_on, manager_id, state)
    values
        ( 'Trai cay pack', '2022-02-02', '2021-12-25', 2, true);
    insert into package
        (name, due_date, created_on, manager_id, state)
    values
        ( 'Dong vat pack', '2022-02-02', '2021-12-25', 2, true);

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


    -- user
    insert into account
        ( username, password, status, role_id, person_id)
    values
        ( 'user1', '$2b$10$5Uvopx3l2ILJYc4WSavvduC3WTFBgLjxV52SXomceckmgPEKsASnC', 'active', 3, 1);
    insert into account
        ( username, password, status, role_id, person_id)
    values
        ( 'user2', '$2b$10$5Uvopx3l2ILJYc4WSavvduC3WTFBgLjxV52SXomceckmgPEKsASnC', 'active', 3, 2);

    -- Checkout
    insert into checkout (account_id, package_id, checkout_date)
    values (4, 2, '2021-12-25');

    insert into checkout_item ( checkout_id, item_id, user_quantity)
    values (1,4,1 );
    insert into checkout_item ( checkout_id, item_id, user_quantity)
    values (1,5,1 );
    insert into checkout_item ( checkout_id, item_id, user_quantity)
    values (1,6,1 );

-- Indept
    insert into public.indept ( indept, due_date, account_id, minimum_pay, state)
values (420000, '2023-01-01', 4, 50000, false);

    -- Account payment
    insert into account_payment
        ( password, account_id, balance)
    values
        ( '$2b$10$5Uvopx3l2ILJYc4WSavvduC3WTFBgLjxV52SXomceckmgPEKsASnC', 3, 2000000);
    insert into account_payment
        ( password, account_id, balance)
    values
        ( '$2b$10$5Uvopx3l2ILJYc4WSavvduC3WTFBgLjxV52SXomceckmgPEKsASnC', 4, 2000000);


-- Tạo ph cho user2
insert into payment_history ( account_id, payment_on, checkout_id, total_money)
values (4, '2022-01-10', 1, 420000);
-- Trừ nợ
insert into public.indept ( indept, due_date, account_id, minimum_pay, state)
values (0, '2023-01-01', 4, 50000, true);

-- User1 mua đồ
    insert into checkout (account_id, package_id, checkout_date)
        values (3, 1, '2022-01-25');

    insert into checkout_item ( checkout_id, item_id, user_quantity)
        values (2,1,1 );
    insert into checkout_item ( checkout_id, item_id, user_quantity)
        values (2,2,1 );
    insert into checkout_item ( checkout_id, item_id, user_quantity)
        values (2,3,1 );

-- Cập nhật số nợ
insert into public.indept ( indept, due_date, account_id, minimum_pay, state)
values (50000, '2023-01-01', 3, 50000, false);


-- Item
insert into item
    ( name, image, price, unit, created_on, manager_id, state)
values
    ( 'Mit Thai', null, 29000, 'kg', '1-19-2022', 2, true);
insert into item
    ( name, image, price, unit, created_on, manager_id, state)
values
    ( 'Xoai Dai Loan', null, 12000, 'kg', '1-19-2022', 2, true);
insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Dua Hau', null, 20000, 'kg', '1-19-2022', 2, true);
insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Thanh Long Ruot Do', null, 18000, 'kg', '1-19-2022', 2, true);
insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Dua Xiem', null, 19000, 'kg', '1-19-2022', 2, true);
insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Cai Thia', null, 13000, 'kg', '1-19-2022', 2, true);

insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Khoai Lang Nhat', null, 37000, 'kg', '1-19-2022', 2, true);
insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Nho Khong Hat Uc', null, 237000, 'kg', '1-19-2022', 2, true);
insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Nho Den Ngon Tay Uc', null, 247000, 'kg', '1-19-2022', 2, true);

insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Cam My', null, 150000, 'kg', '1-19-2022', 2, true);

insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Cai xoan Kale', null, 22000, 'kg', '1-19-2022', 2, true);
insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Dua Leo Baby', null, 31000, 'kg', '1-19-2022', 2, true);
insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Bap Bo Uc cat lat', null, 252000, 'kg', '1-19-2022', 2, true);
insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Nac dui heo', null, 134000, 'kg', '1-19-2022', 2, true);
insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Ba chi Bo', null, 130000, 'kg', '1-19-2022', 2, true);
insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Ba chi heo', null, 125000, 'kg', '1-19-2022', 2, true);
insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Duoi heo dong lanh', null, 100000, 'kg', '1-19-2022', 2, true);
insert into item
        ( name, image, price, unit, created_on, manager_id, state)
    values
        ( 'Ba chi heo dong lanh', null, 117000, 'kg', '1-19-2022', 2, true);