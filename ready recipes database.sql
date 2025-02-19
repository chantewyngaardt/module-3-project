create database ready_recipes;
use ready_recipes;

-- users table 
create table users(
	user_id int auto_increment primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null, 
    email varchar(255) unique not null,
    password text not null,
    phone_number varchar(20),
    role enum('customer', 'driver', 'supplier') not null default 'customer',
    created_at timestamp default current_timestamp
);
-- meal kits table 
create table meal_kits(
	meal_kit_id int auto_increment primary key,
    meal_kit_name varchar(255),
    meal_description text,
    price decimal(10,2) not null,
    category enum('meal-kit', 'ready-made') not null,
    cuisine varchar(255),
    ingredients text,
    calories int,
    dietary_info text,
    image_url varchar(255),
    stock_quantity int not null, 
    created_at timestamp default current_timestamp
);
-- ready-made meals table
create table ready_meal(
	ready_meal_id int auto_increment primary key,
    meal_name varchar(255) not null,
    description text,
    price decimal(10,2) not null,
    category enum('meal-kit', 'ready-made') not null,
    cuisine varchar(255),
    ingredients text,
    calories int,
    dietary_info text,
    image_url varchar(255),
    stock_quantity int not null,
    created_at timestamp default current_timestamp
); 
-- users cart table
create table cart(
	cart_id int auto_increment primary key,
    user_id int not null,
    meal_kit_id int,
    ready_meal_id int,
    meal_details int, 
    quantity int,
    subtotal decimal(10,2) not null,
    foreign key (user_id) references users(user_id) on delete cascade,
    foreign key (meal_kit_id) references meal_kits(meal_kit_id) on delete cascade,
    foreign key (ready_meal_id) references ready_meal(ready_meal_id) on delete cascade
);
-- orders table
create table orders(
	order_id int auto_increment primary key,
    user_id int not null,
    total_price decimal(10,2) not null,
    order_status enum('pending', 'confirmed', 'shipped', 'delivered') default 'pending',
    created_at timestamp default current_timestamp,
    foreign key (user_id) references users(user_id) on delete cascade
); 
-- order items table 
create table order_item(
	order_item_id int auto_increment primary key,
    order_id int not null, 
    meal_kit_id int, 
    ready_meal_id int,
    quantity int not null,
    subtotal decimal(10,2) not null, 
    foreign key (order_id) references orders(order_id) on delete cascade,
    foreign key (meal_kit_id) references meal_kits(meal_kit_id) on delete cascade,
    foreign key (ready_meal_id) references ready_meal(ready_meal_id) on delete cascade 
);
-- payments table 
create table payments(
	payment_id int auto_increment primary key,
    order_id int not null,
    user_id int not null,
    payment_method enum('credit card', 'EFT', 'PayFast', 'SnapScan', 'Ozow') not null,
    transaction_id varchar(255) unique,
    status enum('successful', 'failed', 'pending') default 'pending',
    created_at timestamp default current_timestamp,
    foreign key (order_id) references orders(order_id) on delete cascade,
    foreign key (user_id) references users(user_id) on delete cascade
);
-- delivery table
create table delivery(
	delivery_id int auto_increment primary key,
    order_id int not null,
    driver_id int,
    status enum('assigned', 'out for delivery', 'delivered') default 'assigned',
    tracking_number varchar(255),
    foreign key (order_id) references orders(order_id) on delete cascade, 
    foreign key (driver_id) references users(user_id) on delete cascade
); 
-- supplier order table
create table supplier_orders(
	supplier_order_id int auto_increment primary key,
    supplier_id int not null,
    meal_kit_id int,
    ready_meal_id int,
    quantity int not null,
    status enum('pending', 'ready', 'shipped') default 'pending',
    foreign key (supplier_id) references users(user_id) on delete cascade, 
    foreign key (meal_kit_id) references meal_kits(meal_kit_id) on delete cascade,
    foreign key (ready_meal_id) references ready_meal(ready_meal_id) on delete cascade
); 
-- enquiry table 
create table enquiries(
	enquiry_id int auto_increment primary key,
    enquiry_user_id int not null, 
    first_name varchar(255),
    email varchar(255),
    message text not null,
    created_at timestamp default current_timestamp
);

-- insert information into meal kits table
INSERT INTO `ready_recipes`.`meal_kits` 
(`meal_kit_name`, `meal_description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Grilled Fish with Mielie Rice & Spinach Kit', 
'A light and nutritious South African meal featuring grilled fish, mielie (corn) rice, and sautéed spinach.', 
85.99, 
'meal-kit', 
'South African', 
'Hake fillet, mielie rice (corn-infused rice), fresh spinach, onions, garlic, lemon, olive oil, salt, pepper, paprika', 
650, 
'Halal-certified; gluten-free', 
'https://www.healthyfood.com/wp-content/uploads/2016/09/Grilled-fish-and-vege-rice-1024x660.jpg', 
30, 
CURRENT_TIMESTAMP); 

INSERT INTO `ready_recipes`.`meal_kits` 
(`meal_kit_name`, `meal_description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Bobotie Kit',
'A traditional South African dish made with spiced minced meat and a creamy egg-based topping, served with yellow rice and chutney.',
149.99,
'meal-kit',
'South African',
'Minced beef, onions, garlic, curry powder, turmeric, bay leaves, bread, milk, eggs, apricot jam, vinegar, raisins, yellow rice, chutney',
650,
'Contains dairy, eggs, gluten; halal-certified',
'https://foodieonboard.com/wp-content/uploads/2014/11/dsc_6572.jpg',
25,
CURRENT_TIMESTAMP);

INSERT INTO `ready_recipes`.`meal_kits`
(`meal_kit_name`, `meal_description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Bunny Chow Kit',
'A Durban classic! This kit includes all the ingredients needed to make an authentic Bunny Chow—a hollowed-out bread loaf filled with rich, spicy curry.',
129.99,
'meal-kit',
'South African',
'White bread loaf, lamb, onions, tomatoes, garlic, ginger, curry powder, chili, bay leaves, potatoes, fresh coriander',
720,
'Contains gluten; halal-certified',
'https://lh3.googleusercontent.com/5P0YABUfVTsSB_b4Uw4UX90LB0HqB5JmDnpL8PyYKMr2sNeiCRxHWkk3kbizdKPEQXmYRxkvND_gK2DEpRUyZBs=s1500-pp',
30,
CURRENT_TIMESTAMP);

INSERT INTO `ready_recipes`.`meal_kits`
(`meal_kit_name`, `meal_description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Umngqusho Kit',
'A hearty South African dish made with slow-cooked samp and beans, served with a flavorful beef stew.',
199.99,
'meal-kit',
'South African',
'Samp, sugar beans, halal beef, onions, tomatoes, garlic, ginger, bay leaves, salt, pepper, vegetable stock',
650,
'Halal-certified; contains legumes',
'https://www.thesouthafrican.com/wp-content/uploads/2020/07/087f68fa-umgquasho-samp-and-beans-with-lamb-and-chakalaka.jpg',
30,
CURRENT_TIMESTAMP);

INSERT INTO `ready_recipes`.`meal_kits`
(`meal_kit_name`, `meal_description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Chakalaka & Pap Kit',
'A South African favorite! This kit includes everything needed to prepare a hearty meal of spicy vegetable chakalaka and soft maize pap.',
89.99,
'meal-kit',
'South African',
'Maize meal, onions, tomatoes, carrots, baked beans, bell peppers, garlic, curry powder, chili, salt, vegetable stock',
550,
'Vegan; gluten-free',
'https://www.kitchenfrau.com/wp-content/uploads/2021/06/IMG_1058es.jpg',
40,
CURRENT_TIMESTAMP);

INSERT INTO `ready_recipes`.`meal_kits`
(`meal_kit_name`, `meal_description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Potjiekos Kit', 
'A classic slow-cooked South African stew made with tender beef, vegetables, and rich flavors.',
99.99,
'meal-kit',
'South African',
'Beef, potatoes, carrots, onions, mielies, tomatoes, garlic, beef stock, bay leaves, curry powder, salt, pepper, rice',
750,
'Halal-certified; contains gluten',
'https://afternoonexpress.co.za/website/admin/UserFiles/Image/2023/Bredie.jpg',
35,
CURRENT_TIMESTAMP);

INSERT INTO `ready_recipes`.`meal_kits`
(`meal_kit_name`, `meal_description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Vetkoek with Mince',
'A delicious South African classic! This kit includes everything needed to make crispy, golden vetkoek filled with savory mince.',
94.99,
'meal-kit',
'South African',
'Flour, yeast, sugar, salt, cooking oil, halal beef mince, onions, tomatoes, garlic, spices',
680,
'Halal-certified; contains gluten',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGCQvEDbe1bYwCR3e3LoiJEi7xLnacjIPE8A&s',
40,
CURRENT_TIMESTAMP);

INSERT INTO `ready_recipes`.`meal_kits`
(`meal_kit_name`, `meal_description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Grilled Boerewors & Veggies with Brown Rice Kit',
'A hearty and flavorful South African meal featuring grilled halal boerewors, roasted vegetables, and wholesome brown rice.',
79.99,
'meal-kit',
'South African',
'Boerewors, brown rice, bell peppers, zucchini, carrots, onions, garlic, olive oil, salt, pepper, paprika',
720,
'Halal-certified; gluten-free',
'https://taste.co.za/wp-content/uploads/2024/11/Boerewors-traybake.jpg',
35,
CURRENT_TIMESTAMP);

INSERT INTO `ready_recipes`.`meal_kits` 
(`meal_kit_name`, `meal_description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Taco Kit', 'Make your own tacos with a mix of soft and hard shells, spiced beef, and fresh toppings.', 99.99, 'meal-kit', 'Mexican', 'Soft tortillas, hard taco shells, ground beef, taco seasoning, lettuce, tomatoes, cheese, sour cream, salsa', 650, 'Contains dairy, gluten; halal-certified', 'https://thebakermama.com/wp-content/uploads/2022/03/IMG_0389-scaled.jpg', 30, CURRENT_TIMESTAMP),

('Enchilada Kit', 'Corn tortillas filled with seasoned chicken and covered in a flavorful enchilada sauce.', 109.99, 'meal-kit', 'Mexican', 'Corn tortillas, shredded chicken, enchilada sauce, cheese, sour cream, cumin, chili powder', 700, 'Contains dairy; halal-certified', 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2024-05-mexican-enchiladas%2Fmexican-enchiladas-435', 30, CURRENT_TIMESTAMP),

('Quesadilla Kit', 'A crispy, cheesy quesadilla with steak and fresh toppings.', 94.99, 'meal-kit', 'Mexican', 'Flour tortillas, cheese, grilled steak, onions, bell peppers, sour cream, salsa', 680, 'Contains dairy, gluten; halal-certified', 'https://cdn.loveandlemons.com/wp-content/uploads/2024/01/quesadilla-500x500.jpg', 35, CURRENT_TIMESTAMP),

('Fajita Kit', 'Sizzling marinated steak fajitas with bell peppers and onions, served with warm tortillas.', 109.99, 'meal-kit', 'Mexican', 'Flour tortillas, marinated steak, bell peppers, onions, fajita seasoning, sour cream, salsa', 730, 'Contains dairy, gluten; halal-certified', 'https://theyummybowl.com/wp-content/uploads/TYB-FEATURED-1.jpg', 30, CURRENT_TIMESTAMP);

INSERT INTO `ready_recipes`.`meal_kits` 
(`meal_kit_name`, `meal_description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Ramen Kit', 'Enjoy a comforting bowl of ramen with fresh noodles, miso broth, and classic toppings.', 99.99, 'meal-kit', 'Asian', 'Fresh ramen noodles, miso paste, soy sauce, spring onions, nori, boiled egg, sesame seeds', 550, 'Contains gluten; halal-certified', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIh00BItzuOQQi-CYYGXL_LbY-nwbV9h0Fpg&s', 30, CURRENT_TIMESTAMP),

('Stir-Fry Kit', 'A quick and delicious stir-fry chicken, fresh veggies, and soy sauce.', 99.99, 'meal-kit', 'Asian', 'Chicken, bell peppers, carrots, broccoli, garlic, soy sauce, rice/noodles', 600, 'Contains gluten, halal-certified', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/pork-noodle-stir-fry-3cb19c3.jpg', 35, CURRENT_TIMESTAMP),

('Dumpling Kit', 'Handmade dumplings with a vegetable filling, served with a dipping sauce.', 109.99, 'meal-kit', 'Asian', 'Dumpling wrappers, veggies, ginger, soy sauce, sesame oil, garlic', 580, 'Contains gluten; halal-certified', 'https://images.squarespace-cdn.com/content/v1/55be995de4b071c106b3b4c0/6af0cbeb-8a58-4993-ab68-8e9919d6d04c/Salmon+Dumplings-6.jpg', 30, CURRENT_TIMESTAMP),

('Teriyaki Chicken Kit', 'Marinated teriyaki chicken stir-fried with fresh veggies and served with rice.', 109.99, 'meal-kit', 'Asian', 'Halal chicken, soy sauce, honey, garlic, ginger, sesame seeds, rice', 720, 'Contains gluten; halal-certified', 'https://images.squarespace-cdn.com/content/v1/55be995de4b071c106b3b4c0/6af0cbeb-8a58-4993-ab68-8e9919d6d04c/Salmon+Dumplings-6.jpg', 30, CURRENT_TIMESTAMP),

('Bao Bun Kit', 'Soft and fluffy bao buns filled with tender marinated beef.', 99.99, 'meal-kit', 'Asian', 'Bao buns, halal beef, hoisin sauce, pickled cucumbers', 680, 'Halal-certified; contains gluten', 'https://eatlittlebird.com/wp-content/uploads/2022/09/korean-fried-chicken-bao-buns-5-225x225.jpg', 25, CURRENT_TIMESTAMP);


