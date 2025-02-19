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

('Fajita Kit', 'Sizzling marinated steak fajitas with bell peppers and onions, served with warm tortillas.', 109.99, 'meal-kit', 'Mexican', 'Flour tortillas, marinated steak, bell peppers, onions, fajita seasoning, sour cream, salsa', 730, 'Contains dairy, gluten; halal-certified', 'https://theyummybowl.com/wp-content/uploads/TYB-FEATURED-1.jpg', 30, CURRENT_TIMESTAMP),

('Burrito Bowl Kit', 'A simple and filling burrito bowl with rice, beans, and a chicken.', 94.99, 'meal-kit', 'Mexican', 'Rice, black beans, grilled chicken or beef, salsa, cheese', 700, 'Contains dairy; gluten-free', 'https://feelgoodfoodie.net/wp-content/uploads/2023/09/Chicken-Burrito-Bowl-TIMG.jpg', 35, CURRENT_TIMESTAMP),

('Salsa & Guacamole Snack Kit', 'Fresh homemade salsa and guacamole served with crispy tortilla chips.', 74.99, 'meal-kit', 'Mexican', 'Tomatoes, avocados, lime, garlic, onions, tortilla chips, cilantro', 450, 'Vegan; gluten-free', 'https://www.thedailymeal.com/img/gallery/roasted-garlic-guacamole-with-homemade-air-fryer-tortilla-chips/guac-chips.jpg', 50, CURRENT_TIMESTAMP),

('Chiles Rellenos Kit', 'Stuffed poblano peppers with cheese, served with a rich tomato sauce.', 89.99, 'meal-kit', 'Mexican', 'Poblano peppers, cheese, tomato sauce, garlic, onions, flour', 580, 'Vegetarian; contains gluten and dairy', 'https://www.chilipeppermadness.com/wp-content/uploads/2024/09/Chiles-Rellenos-Recipe-SQ.jpg', 30, CURRENT_TIMESTAMP),

('Tamale Kit', 'Easy-to-make tamales with corn masa and a simple meat .', 94.99, 'meal-kit', 'Mexican', 'Corn masa, chicken, corn husks, chili sauce', 590, 'Gluten-free', 'https://temeculablogs.com/wp-content/uploads/2023/03/how-to-make-red-tamales.jpeg', 30, CURRENT_TIMESTAMP)
;

INSERT INTO `ready_recipes`.`meal_kits` 
(`meal_kit_name`, `meal_description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Ramen Kit', 'Enjoy a comforting bowl of ramen with fresh noodles, miso broth, and classic toppings.', 99.99, 'meal-kit', 'Asian', 'Fresh ramen noodles, miso paste, soy sauce, spring onions, nori, boiled egg, sesame seeds', 550, 'Contains gluten; halal-certified', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIh00BItzuOQQi-CYYGXL_LbY-nwbV9h0Fpg&s', 30, CURRENT_TIMESTAMP),

('Stir-Fry Kit', 'A quick and delicious stir-fry chicken, fresh veggies, and soy sauce.', 99.99, 'meal-kit', 'Asian', 'Chicken, bell peppers, carrots, broccoli, garlic, soy sauce, rice/noodles', 600, 'Contains gluten, halal-certified', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/pork-noodle-stir-fry-3cb19c3.jpg', 35, CURRENT_TIMESTAMP),

('Dumpling Kit', 'Handmade dumplings with a vegetable filling, served with a dipping sauce.', 109.99, 'meal-kit', 'Asian', 'Dumpling wrappers, veggies, ginger, soy sauce, sesame oil, garlic', 580, 'Contains gluten; halal-certified', 'https://images.squarespace-cdn.com/content/v1/55be995de4b071c106b3b4c0/6af0cbeb-8a58-4993-ab68-8e9919d6d04c/Salmon+Dumplings-6.jpg', 30, CURRENT_TIMESTAMP),

('Teriyaki Chicken Kit', 'Marinated teriyaki chicken stir-fried with fresh veggies and served with rice.', 109.99, 'meal-kit', 'Asian', 'Halal chicken, soy sauce, honey, garlic, ginger, sesame seeds, rice', 720, 'Contains gluten; halal-certified', 'https://images.squarespace-cdn.com/content/v1/55be995de4b071c106b3b4c0/6af0cbeb-8a58-4993-ab68-8e9919d6d04c/Salmon+Dumplings-6.jpg', 30, CURRENT_TIMESTAMP),

('Bao Bun Kit', 'Soft and fluffy bao buns filled with tender marinated beef.', 99.99, 'meal-kit', 'Asian', 'Bao buns, halal beef, hoisin sauce, pickled cucumbers', 680, 'Halal-certified; contains gluten', 'https://eatlittlebird.com/wp-content/uploads/2022/09/korean-fried-chicken-bao-buns-5-225x225.jpg', 25, CURRENT_TIMESTAMP);

INSERT INTO `ready_recipes`.`meal_kits` 
(`meal_kit_name`, `meal_description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Homemade Pizza Kit', 'Make your own delicious pizza at home with a fresh dough base, tomato sauce, and mozzarella cheese.', 119.99, 'meal-kit', 'Italian', 'Pizza dough mix, tomato sauce, mozzarella cheese, dried oregano', 750, 'Contains gluten, dairy', 'https://prettysimplesweet.com/wp-content/uploads/2015/12/classic_margherita_pizza.jpg', 40, CURRENT_TIMESTAMP),

('Lasagna Kit', 'A rich and hearty lasagna with layers of pasta, tomato sauce, minced beef, and creamy cheese.', 139.99, 'meal-kit', 'Italian', 'Lasagna sheets, tomato sauce, minced beef, mozzarella cheese, onion, garlic, béchamel sauce', 820, 'Contains gluten, dairy', 'https://static01.nyt.com/images/2023/08/31/multimedia/RS-Lasagna-hkjl/RS-Lasagna-hkjl-googleFourByThree-v2.jpg', 35, CURRENT_TIMESTAMP),

('Gnocchi Kit', 'Soft potato gnocchi served with a creamy parmesan sauce or a light tomato sauce.', 109.99, 'meal-kit', 'Italian', 'Potato gnocchi, parmesan cheese, garlic, olive oil, tomato sauce', 650, 'Vegetarian; contains gluten, dairy', 'https://static01.nyt.com/images/2023/08/31/multimedia/RS-Lasagna-hkjl/RS-Lasagna-hkjl-googleFourByThree-v2.jpg', 30, CURRENT_TIMESTAMP),

('Bruschetta Kit', 'A simple and classic Italian appetizer with toasted bread, fresh tomatoes, garlic, and basil.', 89.99, 'meal-kit', 'Italian', 'Baguette, fresh tomatoes, garlic, olive oil, basil', 480, 'Vegan option available', 'https://www.allrecipes.com/thmb/QSsjryxShEx1L6o0HLer1Nn4jwA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/54165-balsamic-bruschetta-DDMFS-4x3-e2b55b5ca39b4c1783e524a2461634ea.jpg', 50, CURRENT_TIMESTAMP);

-- delete duplicate rows
-- DELETE FROM `ready_recipes`.`meal_kits` WHERE (`meal_kit_id` = '21');
-- DELETE FROM `ready_recipes`.`meal_kits` WHERE (`meal_kit_id` = '22');
-- DELETE FROM `ready_recipes`.`meal_kits` WHERE (`meal_kit_id` = '23');
-- DELETE FROM `ready_recipes`.`meal_kits` WHERE (`meal_kit_id` = '24');

INSERT INTO `ready_recipes`.`ready_meal` 
(`meal_name`, `description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Cape Malay Chicken Curry with Yellow Rice', 'A mildly spiced, fragrant chicken curry with turmeric-infused yellow rice.', 89.99, 'ready-made', 'South African', 'Halal chicken, onions, garlic, ginger, curry powder, turmeric, tomatoes, yellow rice', 720, 'Halal-certified', 'https://fussfreeflavours.com/wp-content/uploads/2021/08/Slow-cooker-chicken-curry-Recipe-Card.jpg', 50, CURRENT_TIMESTAMP),

('Boerewors & Pap with Tomato Gravy', 'Traditional boerewors served with creamy pap and a rich tomato gravy.', 79.99, 'ready-made', 'South African', 'Boerewors, maize meal, tomatoes, onions, garlic, salt, pepper', 850, 'Halal-certified, gluten-free', 'https://i0.wp.com/www.biltongblog.com/wp-content/uploads/2015/10/pap-en-wors.jpg', 60, CURRENT_TIMESTAMP),

('Chakalaka with Mealie Bread', 'A flavorful South African vegetable relish served with warm, homemade mealie bread.', 74.99, 'ready-made', 'South African', 'Bell peppers, carrots, tomatoes, baked beans, chili, maize flour, sugar', 600, 'Vegan, gluten-free', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw5_iCcilBivK-zEOS9aN3JWs2vRnbVqAcWw&s', 40, CURRENT_TIMESTAMP),

('Durban-Style Bunny Chow', 'A classic street food dish with a hollowed-out bread loaf filled with rich, spicy curry.', 94.99, 'ready-made', 'South African', 'White bread loaf, chicken, onions, tomatoes, garlic, curry powder, coriander', 750, 'Contains gluten; halal-certified', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw5_iCcilBivK-zEOS9aN3JWs2vRnbVqAcWw&s', 50, CURRENT_TIMESTAMP),

('Lamb Potjie with Root Vegetables', 'Slow-cooked lamb potjie with carrots, potatoes, and a rich gravy.', 159.99, 'ready-made', 'South African', 'Halal lamb, potatoes, carrots, onions, garlic, beef stock, bay leaves', 850, 'Halal-certified, gluten-free', 'https://melbyspost.co.za/wp-content/uploads/2022/12/20161016_154112-scaled.jpg', 30, CURRENT_TIMESTAMP),

('Bobotie with Saffron Rice & Chutney', 'A Cape Malay spiced mince dish topped with egg custard, served with saffron-infused rice and fruit chutney.', 139.99, 'ready-made', 'South African', 'Minced beef, onions, garlic, curry powder, turmeric, eggs, bread, saffron rice, chutney', 780, 'Halal-certified; contains gluten, dairy', 'https://foodieonboard.com/wp-content/uploads/2014/11/dsc_6586.jpg', 40, CURRENT_TIMESTAMP),

('Grilled Snoek with Apricot Glaze', 'Deliciously grilled snoek fish brushed with a sweet and tangy apricot glaze.', 129.99, 'ready-made', 'South African', 'Snoek fish, apricot jam, garlic, lemon, olive oil, salt, pepper', 670, 'Halal-certified, gluten-free', 'https://taste.co.za/wp-content/uploads/2019/05/Braaied-snoek-with-sticky-apricot-glaze.jpg', 30, CURRENT_TIMESTAMP),

('Oxtail Stew with Samp & Beans', 'A rich and hearty oxtail stew, slow-cooked to perfection and served with samp and beans.', 169.99, 'ready-made', 'South African', 'Oxtail, samp, sugar beans, onions, tomatoes, garlic, bay leaves', 900, 'Halal-certified; gluten-free', 'https://www.instantpot.co.za/img/c/undefined/800/png/canva-creamy-samp.webp', 25, CURRENT_TIMESTAMP);

INSERT INTO `ready_recipes`.`ready_meal` 
(`meal_name`, `description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Mexican Rice with Black Beans & Guacamole', 'A hearty and nutritious dish with spiced Mexican rice, black beans, and creamy guacamole.', 79.99, 'ready-made', 'Mexican', 'Rice, black beans, avocados, tomatoes, onions, garlic, lime, cumin, cilantro', 620, 'Vegan; gluten-free', 'https://nadiashealthykitchen.com/wp-content/uploads/2016/05/mexican-bean-rice.jpg', 50, CURRENT_TIMESTAMP),

('Cheesy Beef Quesadilla with Sour Cream', 'A crispy flour tortilla filled with seasoned beef and melted cheese, served with sour cream.', 89.99, 'ready-made', 'Mexican', 'Flour tortillas, minced beef, cheese, sour cream, onions, garlic, spices', 700, 'Contains dairy, gluten', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT80xm-RNYMaI-Wf4hGEQpNe-1gkM_9Um5QJw&s', 50, CURRENT_TIMESTAMP),

('Carne Asada Tacos with Salsa Verde', 'Tender grilled steak tacos topped with fresh salsa verde and served in warm corn tortillas.', 139.99, 'ready-made', 'Mexican', 'Halal beef, corn tortillas, salsa verde, onions, cilantro, lime', 750, 'Halal-certified; gluten-free', 'https://cookthestory.com/wp-content/uploads/2023/02/carne-asada-tacos-square-01.jpg', 30, CURRENT_TIMESTAMP),

('Chicken Enchiladas with Mole Sauce', 'Corn tortillas filled with shredded chicken and covered in a rich mole sauce.', 129.99, 'ready-made', 'Mexican', 'Corn tortillas, chicken, mole sauce, cheese, sour cream', 820, 'Contains dairy', 'https://www.jessicagavin.com/wp-content/uploads/2018/04/chicken-enchiladas-5-1200.jpg', 35, CURRENT_TIMESTAMP);

INSERT INTO `ready_recipes`.`ready_meal` 
(`meal_name`, `description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Vegetable Fried Rice with Tofu', 'A simple yet delicious stir-fried rice dish with tofu and fresh vegetables.', 79.99, 'ready-made', 'Asian', 'Rice, tofu, carrots, bell peppers, peas, soy sauce, garlic, sesame oil', 600, 'Vegan; gluten-free option available', 'https://minimalistbaker.com/wp-content/uploads/2015/08/THE-BEST-HEALTHY-Vegan-Fried-Rice-with-Crispy-Tofu-vegan-glutenfree-recipe-chinese-friedrice-plantbased-689x1024-1.jpg', 20, CURRENT_TIMESTAMP),

('Sweet & Sour Chicken with Pineapple & Peppers', 'Crispy chicken tossed in a tangy sweet and sour sauce with pineapple and bell peppers.', 99.99, 'ready-made', 'Asian', 'Halal chicken, bell peppers, pineapple, vinegar, soy sauce, garlic, sugar', 720, 'Halal-certified; contains gluten', 'https://www.modernhoney.com/wp-content/uploads/2023/01/Sweet-and-Sour-Chicken-3-crop-scaled.jpg', 45, CURRENT_TIMESTAMP),

('Beef Ramen with Soft-Boiled Egg & Scallions', 'A rich and savory beef ramen served with a perfectly soft-boiled egg and fresh scallions.', 149.99, 'ready-made', 'Asian', 'Ramen noodles, halal beef, soy sauce, miso paste, scallions, eggs, sesame seeds', 750, 'Contains gluten, eggs', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgfZAnPp3_VG76BYixt9Ti_amOuIr7ehInbAiOAJxRKC3hasdMxKbF56PWEalT-AJgGWAesx-DlAAdPyFvp9EmCeRo6vHdO-wuUaWvnWI41V-lkVFEYwLF8YdffGu_I6FSBYpSvcQmB6Ko/s1600/515.jpg', 30, CURRENT_TIMESTAMP),

('Thai Green Curry with Chicken & Sticky Rice', 'A fragrant Thai green curry made with tender chicken, coconut milk, and served with sticky rice.', 139.99, 'ready-made', 'Asian', 'Halal chicken, coconut milk, green curry paste, basil, sticky rice, garlic', 820, 'Halal-certified; gluten-free', 'https://images.immediate.co.uk/production/volatile/sites/30/2010/09/Thai-green-curry-bb9f6ae.jpg?resize=768,574', 35, CURRENT_TIMESTAMP);

-- DELETE FROM `ready_recipes`.`meal_kits` WHERE (`meal_kit_id` = '26');
-- DELETE FROM `ready_recipes`.`meal_kits` WHERE (`meal_kit_id` = '27');
-- DELETE FROM `ready_recipes`.`meal_kits` WHERE (`meal_kit_id` = '28');
-- DELETE FROM `ready_recipes`.`meal_kits` WHERE (`meal_kit_id` = '29');  

INSERT INTO `ready_recipes`.`ready_meal` 
(`meal_name`, `description`, `price`, `category`, `cuisine`, `ingredients`, `calories`, `dietary_info`, `image_url`, `stock_quantity`, `created_at`) 
VALUES 
('Four-Cheese Ravioli with Pesto Sauce', 'Delicious pasta pockets filled with a blend of cheeses, served with a rich pesto sauce.', 109.99, 'meal-kit', 'Italian', 'Ravioli (ricotta, mozzarella, parmesan, provolone), basil pesto, olive oil, garlic, pine nuts', 720, 'Vegetarian; contains gluten and dairy', 'https://www.twopeasandtheirpod.com/wp-content/uploads/2023/05/5-Ingredient-Pesto-Ravioli-6.jpg', 40, CURRENT_TIMESTAMP),

('Classic Beef Lasagna with Béchamel', 'A hearty, layered lasagna with rich beef ragu, creamy béchamel sauce, and melted cheese.', 129.99, 'meal-kit', 'Italian', 'Lasagna sheets, minced beef, tomatoes, garlic, onions, béchamel sauce, mozzarella, parmesan', 850, 'Halal-certified; contains gluten and dairy', 'https://www.twopeasandtheirpod.com/wp-content/uploads/2023/05/5-Ingredient-Pesto-Ravioli-6.jpg', 35, CURRENT_TIMESTAMP),

('Chicken Parmesan with Marinara & Mozzarella', 'Crispy breaded chicken topped with marinara sauce and melted mozzarella, served with spaghetti.', 139.99, 'meal-kit', 'Italian', 'Halal chicken breast, breadcrumbs, mozzarella, parmesan, marinara sauce, spaghetti', 890, 'Halal-certified; contains gluten and dairy', 'https://preppykitchen.com/wp-content/uploads/2018/10/Chicken-Parmesan-Recipe-n.jpg', 30, CURRENT_TIMESTAMP),

('Seafood Linguine', 'A luxurious seafood linguine with shrimp, mussels, and a delicate garlic butter sauce.', 159.99, 'meal-kit', 'Italian', 'Linguine pasta, shrimp, mussels, white wine, garlic, olive oil, parsley', 820, 'Contains shellfish, gluten', 'https://preppykitchen.com/wp-content/uploads/2018/10/Chicken-Parmesan-Recipe-n.jpg', 25, CURRENT_TIMESTAMP);


