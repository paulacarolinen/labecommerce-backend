-- Active: 1681699755921@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL, 
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME('now', '-3 hours'))
);

SELECT * FROM users;

DROP TABLE users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NULL,
    image_url TEXT NULL
);

SELECT * FROM products;

DROP TABLE products;

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT(DATETIME('now', '-3 hours')), 
    paid INTEGER NOT NULL DEFAULT (0), 
    FOREIGN KEY (buyer) REFERENCES users(id)
);

SELECT * FROM purchases;

DROP TABLE purchases;

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

SELECT * FROM purchases_products;

DROP TABLE purchases_products;