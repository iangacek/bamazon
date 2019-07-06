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
        choices: ["View Products for Sale", "View Low Inventory (Fewer Than 50)", "Add to Inventory", "Add New Product"]
    }).then(function (answer) {
        if (answer.managerOption == "View Products for Sale") {
            productsForSale();
        } else if (answer.managerOption == "View Low Inventory (Fewer Than 50)") {
            viewLowInventory();
        } else {
            addInventory();
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
    connection.query("SELECT * FROM products", function (err, res) {
        inquirer.prompt({
            name: "choice",
            type: "rawlist",
            // This loop displays objects in an array
            choices: function (value) { var choiceArray = []; for (var i = 0; i < res.length; i++) { choiceArray.push(res[i].product_name); } return choiceArray; }, message: "What item would you like to add stock to?"
        }).then(function (answer) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name == answer.choice) {
                    var chosenItem = res[i];
                    inquirer.prompt({
                        name: "addQuantity",
                        type: "input",
                        message: "How much stock would you like to add?",
                        validate: function (value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        },
                    }).then(function (answer) {
                        connection.query("UPDATE products SET stock_quantity = stock_quantity + " + answer.addQuantity + " WHERE item_id = " + chosenItem.item_id);
                        // INSERT LINE TO ADD UPDATED QUANTITY HERE
                        start();
                    })
                }
            }
        })
    })
}