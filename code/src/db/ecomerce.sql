CREATE DATABASE ecomerce;
USE ecomerce;

CREATE TABLE users (
    id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    usuario VARCHAR(10) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(8) NOT NULL,
    birth_date DATE,
    postal_code INT(4),
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE category (
    id_category INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE products (
    id_product INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    id_category INT,
    description VARCHAR(200),
    FOREIGN KEY (id_category)
        REFERENCES category (id_category)
);


CREATE TABLE sale_order (
    id_order INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date_order DATETIME,
    id_user INT,
    total_order DECIMAL(6 , 2 ),
    FOREIGN KEY (id_user)
        REFERENCES users (id_user)
);

CREATE TABLE detail_order (
    id_detail_order INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_order INT,
    id_product INT,
    amount INT,
    sale_price DECIMAL(6 , 2 ),
    FOREIGN KEY (id_order)
        REFERENCES sale_order (id_order),
    FOREIGN KEY (id_product)
        REFERENCES products (id_product)
);