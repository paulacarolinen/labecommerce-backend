-- Active: 1681699755921@@127.0.0.1@3306
CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES 
	("u001", "user1@email.com", "xxxx"),
	("u002", "user2@email.com", "xxxx"),
    ("u003", "user3@email.com", "xxxx");

CREATE TABLE products (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
    price REAL NOT NULL,
	category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES 
	("p001", "Smartphone", 2000, "Eletrônicos"),
	("p002", "Notebook", 3000, "Eletrônicos"),
    ("p003", "Monitor HD", 1000, "Eletrônicos"),
    ("p004", "Pizza", 40, "Food"),
    ("p005", "T-shirt", 70, "Acessórios");

--Get All Users
SELECT * FROM users;

--Get All Products
SELECT * FROM products;

--Search Product by name
SELECT * FROM products
WHERE name LIKE "%notebook%";

--Create User
INSERT INTO users (id, email, password)
VALUES 
	("u004", "user4@email.com", "xxxx");

--Create Product
INSERT INTO products (id, name, price, category)
VALUES 
	("p006", "Cupcake", 10, "Food");

--Get Product by id
SELECT * FROM products
WHERE id = "p001";

--Delete User by id
DELETE FROM users
WHERE id = "u004";

--Delete Product by id
DELETE FROM products
WHERE id = "p006";

--Edit User by id
UPDATE users
SET password = "yyyy"
WHERE id = "u001";

--Edit Product by id
UPDATE products
SET price = 50
WHERE id = "p004";

--Get All Users Order
SELECT * FROM users
ORDER BY email ASC;

--Get All Products Order / Limit 1-20
SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 1;

--Get All Products Order / Price 10 - 100
SELECT * FROM products
WHERE price >= 10 AND price <= 100
ORDER BY price ASC;