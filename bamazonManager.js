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
    connection.query("SELECT * FROM products", function (err, res) {
        inquirer.prompt({
            name: "choice",
            type: "rawlist",
            // This loop displays objects in an array
            choices: function (value) { var choiceArray = []; for (var i = 0; i < res.length; i++) { choiceArray.push(res[i].product_name); } return choiceArray; }, message: "What item would you like to purchase?"
        }).then(function (answer) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name == answer.choice) {
                    var chosenItem = res[i];
                    inquirer.prompt({
                        name: "productList",
                        type: "input",
                        message: "What item do you want to view??",
                        validate: function (value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        },
                    }).then(function (answer) {
                        if (chosenItem.stock_quantity > parseInt(answer.quantityRequest)) {
                            console.log("\nWe have enough! Current stock: " + chosenItem.stock_quantity + "\n");
                            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + answer.quantityRequest + " WHERE item_id = " + chosenItem.item_id);
                            var total = chosenItem.price * answer.quantityRequest
                            console.log("Your total cost is: " + total + "\n");
                            start();
                        } else {
                            console.log(chosenItem.stock_quantity);
                            console.log("\nUnfortunately we do not have enough stock available to fulfill. Please try another order quantity...");
                            start();
                        }
                    })
                }
            }
        })
    })
}

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