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

connection.connect(function(err) {
    console.log("Connected as id: " + connection.threadId);
    start();
});

// inquirer starting prompt
var start = function() {
    inquirer.prompt({
        name: "purchaseYesOrNo",
        type: "rawlist",
        message: "Would you like to purchase an an item?",
        choices: ["Yes", "No"]
    }).then(function(answer) {
        if (answer.purchaseYesOrNo.toUpperCase() == "POST") {
            purchaseRequest();
        } else {
            purchaseRequest();
        }
    })
}

// POST function
var postAuction = function() {
    inquirer.prompt([{
        name: "item_name",
        type: "input",
        message: "\nWhat item would you like to post?"
    }, {
        name: "category",
        type: "input",
        message: "What category is your item?"
    }, {
        name: "starting_bid",
        type: "input",
        message: "What is the starting bid?",
        validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
            // pushes input to database
    }]).then(function(answer) {
        connection.query("INSERT INTO products SET ?", {
                item_name: answer.item_name,
                category: answer.category,
                starting_bid: answer.starting_bid,
                highest_bid: answer.highest_bid
            },
            function(err, res) {
                console.log("\nYour auction was created successfully!\n");
                start();
            })
    })
}

// BID function
var purchaseRequest = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        // console.log(res);
        inquirer.prompt({
            name: "choice",
            type: "rawlist",
            // forloop displays posted items as array-objects
            choices: function(value) { var choiceArray = []; for (var i = 0; i < res.length; i++) { choiceArray.push(res[i].product_name); } return choiceArray; }, message: "What item would you like to purchase?"
                // calls posted items,
        }).then(function(answer) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name == answer.choice) {
                    var chosenItem = res[i];
                    inquirer.prompt({
                        name: "quantityRequest",
                        type: "input",
                        message: "How many items would you like to purchase?",
                        validate: function(value) {
                                if (isNaN(value) == false) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                            // checks if answer is lower than starting bid
                    }).then(function(answer) {
                        if (res.stock_quantity < parseInt(answer.quantityRequest)) {
                            connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: answer.quantityRequest
                            }, {
                                id: chosenItem.id
                            }], function(err, res) {
                                console.log("Your order was successfully placed!\n");
                                start();
                            });
                        } else {
                            console.log("\nUnfortunately we do not have enough stock available to fulfill. Please try another order quantity...");
                            start();
                        }
                    })
                }
            }
        })
    })
}