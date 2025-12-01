insert into category (name) values ("Бас-гітари"), ("Синтезатори"), ("Ударні"), ("Акустичні гітари"), ("Електричні гітари");
insert manufacturer (name) values ("Fender"), ("Gibson"), ("Roland"), ("Yamaha"), ("Antiquity"), ("Ibanez"), ("Cort");

insert into characteristic (name) values ("Кількість струн"), ("Колір"), ("Особливості");
insert into characteristic_value (characteristic_id, value) values (1, "4"), (1, "5"), (1, "6"), (1, "7"), (1, "8"), (1, "12"),
(2, "Red"), (2, "Blue"), (2, "Black"), (2, "Sunburst"), (2, "Raspberry Red"), (2, "Vintage White"), (2, "Open Pore Black"), (2, "Factory Blue"), (2, "Green"),
(3, "Безладові"), (3, "Мультимензурні"), (3, "Із захисною накладкою"), (3, "З інскрустацією"), (3, "Зі звукознімачем"), (3, "Струни крізь корпус"), (3, "З тюнером");

insert into product (category_id, title, price, amount_available, manufacturer_id, description) values
(1, "Ibanez GSR180 BSB", 10920.0, 10, 6, null),
(1, "Cort Action PJ Open Pore Black (Action PJ OPB)", 9818.0, 12, 7, null),
(1, "Бас-гітара YAMAHA BB235", 18936.0, 7, 4, null), 
(1, "Бас-гітара YAMAHA TRBX-304", 22569.0, 5, 4, null),
(1, "Бас-гітара CORT B5 Element", 25410.0, 3, 7, null),
(1, "Бас-гітара Ibanez GSR180 BSB", 24564.0, 4, 6, null),
(1, "Fender Player II Precision Bass MN Birch Green", 44520.0, 2, 1, null);

insert into product_photo (product_id, url) values 
(1, "https://content.rozetka.com.ua/goods/images/big/45770925.jpg"),
(2, "https://content.rozetka.com.ua/goods/images/big/55594547.jpg"),
(2, "https://content1.rozetka.com.ua/goods/images/big/55594560.jpg"),
(3, "https://content.rozetka.com.ua/goods/images/big/340326505.jpg"),
(3 , "https://content2.rozetka.com.ua/goods/images/big/340326508.jpg"),
(3 , "https://content.rozetka.com.ua/goods/images/big/340326510.jpg"),
(3 , "https://content2.rozetka.com.ua/goods/images/big/340326513.jpg"),
(3 , "https://content2.rozetka.com.ua/goods/images/big/340326517.jpg"),
(4, "https://content1.rozetka.com.ua/goods/images/big/341135190.jpg"),
(4, "https://content2.rozetka.com.ua/goods/images/big/341135193.jpg"),
(4, "https://content2.rozetka.com.ua/goods/images/big/341135195.jpg"),
(5, "https://content2.rozetka.com.ua/goods/images/big/257735806.jpg"),
(5, "https://content1.rozetka.com.ua/goods/images/big/257735816.jpg"),
(5, "https://content1.rozetka.com.ua/goods/images/big/257735835.jpg"),
(5, "https://content.rozetka.com.ua/goods/images/big/257735852.jpg"),
(7, "https://content.rozetka.com.ua/goods/images/big/499150721.jpg"),
(7, "https://content.rozetka.com.ua/goods/images/big/499150734.jpg"),
(7, "https://content.rozetka.com.ua/goods/images/big/499150748.jpg"),
(7, "https://content1.rozetka.com.ua/goods/images/big/499150755.jpg"),
(7, "https://content1.rozetka.com.ua/goods/images/big/499150760.jpg");

insert into product_characteristic_value (product_id, characteristic_id, characteristic_value_id) values
(1, 3, 18), (1, 2, 10), (1, 1, 1),
(2, 2, 13), (2, 1, 2),
(3, 1, 2), (3, 2, 11),
(4, 1, 1), (4, 2, 14),
(5, 1, 2), (5, 2, 13),
(6, 3, 18), (6, 2, 10), (6, 1, 1),
(7, 1, 1), (7, 2, 15), (7, 3, 18);

insert into supplier (name, address, phone_number, email, checking_account_number) values
("Music Store Professional", "Istanbulstr. 22-26 D-51103 Cologne, Germany","+49 (0)221 / 88 84 - 1610", "export@musicstore.com", "4111111117444490"),
("CLUBTECH", "м. Бровари, бул. Незалежності, 16", "+380737890101", "logistclubtech@gmail.com", "4111111115444492"),
("DIFFUZOR", "Україна 65043, м. Одеса, вул. Космонавта Комарова, 10 Зупинка «Промзвязок»", "+38063252655", "sale@diffuzor.com.ua", "4111111111444496");

insert into invoice (supplier_id, order_date) values
(1, "2025-04-10"),
(2, "2025-04-12"),
(3, "2025-04-13");

insert into supply_list (product_id, invoice_id, amount, item_price) values
(1, 1, 10, 10920),
(2, 1, 12, 9818),
(3, 1, 7, 18936),
(4, 2, 5, 22569),
(5, 2, 3, 25410),
(6, 3, 4, 24564),
(7, 3, 2, 44520);

insert into role (id, name) values (8, "ADMIN"), (7, "EMPLOYEE"), (6, "USER");

insert into user (id, username, password, role, email, is_deleted, phone) values 
(1, "admin", "d77f3d1d711c0fc85d91d9350a8e9bdbd8011cf6b55909092ce98460645ed568", 8, "admin@admin.com", false, null),
(2, "employee", "605f75b3f4a0bf1dc2a149d4588945143938a4466f15aab43e77da1fbe0fc277", 7, "employee@employee.com", false, null),
(8, "user", "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4", 6, "user@user.com", false, null);

insert into `order` (id, user_id, employee_id, order_date, delivery_date, is_paid, status, delivery_type, address_id) values
(21, 8, null, "2025-05-21 14:44:05", null, false, "CANCELLED", "PICKUP", 2),
(22, 8, null, "2025-05-21 14:44:05", null, false, "CANCELLED", "PICKUP", 2),
(23, 8, null, "2025-05-21 14:44:05", null, false, "CANCELLED", "PICKUP", 2),
(24, 8, null, "2025-05-21 14:44:05", null, false, "SENT", "PICKUP", 2),
(25, 8, null, "2025-05-21 14:44:05", null, false, "CANCELLED", "PICKUP", 2),
(27, 8, null, "2025-05-21 14:44:05", null, false, "PROCESSING", "PICKUP", 6),
(28, 8, null, "2025-05-21 14:44:05", null, false, "CANCELLED", "PICKUP", 2);

insert into order_item (id, order_id, product_id, item_price, amount) values 
(34, 21, 1, 10920, 1),
(35, 22, 1, 10920, 1),
(36, 23, 1, 10920, 9),
(37, 24, 1, 10920, 1),
(38, 24, 2, 9818, 1),
(39, 25, 2, 9818, 1),
(40, 27, 1, 10920, 2),
(41, 28, 7, 44520, 1);

insert into address_home (id, city, post_code, street, building, apartment, to_apartment, has_elevator, user_id) values
(1, "Харків", "12511", "Каштанова", "61", "15", true, true, 1),
(2, "Харків", "1251", "Каштанова", "61", "15", true, true, 8);

insert into address_pickup (id, department_code) values
(2, "38/1"),
(3, "78/2"),
(4, "67/5"),
(5, "53/3"),
(6, "36/1");
