var mysql = require('mysql');
var inquirer = require('inquirer');

// MySQL database connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
})

connection.connect(function (err) {
    console.log("Connected as id: " + connection.threadId);
    start();
});

// Inquirer prompt
var start = function () {
    inquirer.prompt({
        name: "managerOption",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function (answer) {
        if (answer.managerOption == "View Products for Sale") {
            productsForSale();
        } else if (answer.managerOption == "View Low Inventory") {
            viewLowInventory();
        } else if (answer.managerOption == "Add to Inventory") {
            addInventory();
        } else {
            addNewProduct();
        };
    })
}

var productsForSale = function () {
    connection.query("SELECT * FROM products WHERE stock_quantity >= 1", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res);
        }
        start();
    })
};

var viewLowInventory = function () {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 50", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res);
        }
        start();
    })
};

var addInventory = function () {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 50", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res);
        }
        start();
    })
};

var addNewProduct = function () {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 50", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res);
        }
        start();
    })
};