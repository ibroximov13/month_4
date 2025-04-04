-- Active: 1743675655969@@127.0.0.1@5432@n17

CREATE TABLE IF NOT EXISTS category1 (
    id SERIAL PRIMARY KEY,
    name VARCHAR(55)
);

CREATE TABLE IF NOT EXISTS product1 (
    id SERIAL PRIMARY KEY,
    name VARCHAR(55),
    price INTEGER,
    color VARCHAR(30),
    category1_id INT REFERENCES category1(id)
);