/* Schema for SQL database/table. We haven't discussed this type of file yet */
DROP DATABASE IF EXISTS bamazon;

/* Create database */
CREATE DATABASE bamazon;
USE bamazon;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE products (
  item_id INT(12) NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT(10) NULL,
  stock_quantity INT(10) NULL,
  PRIMARY KEY (item_id)
);