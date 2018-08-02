CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	prod_name VARCHAR(30) NOT NULL,
	dept_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (prod_name, dept_name, price, stock)
VALUES  ('Coffee Machine', 'Home Goods', 5.75, 500),
		('Blowdrier', 'Home Goods', 3.75, 300),
        ('Area Rug', 'Home Goods', 1.75, 1500),
        ('DVD Player', 'Electronics', 7.50, 200),
        ('Plasma TV', 'Electronics', 15.00, 200),
        ('Laptop', 'Electronics', 25.25, 700),
        ('Bread', 'Grocery', 1.00, 2500),
        ('Chicken', 'Grocery', 1.75, 4500),
        ('Coffee', 'Grocery', .75, 6500),
        ('Oil', 'Automotive', 1, 3500),
        ('Wax', 'Automotive', 1.25, 2500),
        ('Light Bulb', 'Automotive', .5, 6500),
        ('3D Printer', 'Specialty', 35.75, 100),
        ('Kayak', 'Specialty', 25.75, 500)