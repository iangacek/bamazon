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
        if (answer.purchaseYesOrNo == "View Products for Sale") {
            purchaseRequest();
        } else if (answer.managerOption == "View Low Inventory") {
            lowInventory();
        } else if (answer.managerOption == "Add to Inventory") {
            addInventory();
        } else {
            newProduct();
        }
    })
};