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

SELECT * FROM users;

SELECT * FROM products;