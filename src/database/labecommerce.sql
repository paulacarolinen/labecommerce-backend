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

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);


INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES ("pu001", 50, 0, "u001"),
("pu002", 2000, 0, "u001"),
("pu003", 100, 0, "u002");

SELECT * FROM purchases;

UPDATE purchases
SET paid = 1
WHERE id = "pu001";

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = "pu001";

SELECT 
users.id AS userId,
users.email,
purchases.id AS purchaseId,
purchases.total_price AS totalPrice,
(CASE WHEN purchases.paid = 0 THEN 'not paid' ELSE 'paid' END) AS paid,
purchases.delivered_at AS deliveredAt,
purchases.buyer_id AS buyerId
FROM users 
INNER JOIN purchases
ON users.id = purchases.buyer_id;

DROP TABLE purchases;

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL
);

INSERT INTO purchases_products
    VALUES
        ("pu001", "p002", 1),
        ("pu001", "p001", 1),
        ("pu001", "p003", 1),
        ("pu002", "p003", 1),
        ("pu002", "p004", 2),
        ("pu002", "p005", 2);

SELECT 
purchases.id as purchaseId,
purchases.total_price,
purchases.buyer_id as buyerId,
products.id AS productId,
purchases_products.quantity,
products.name AS productName,
products.category,
products.price AS productPrice
FROM purchases
INNER JOIN purchases_products ON purchases.id = purchases_products.purchase_id
INNER JOIN products ON purchases_products.product_id = products.id;

DROP TABLE purchases_products;