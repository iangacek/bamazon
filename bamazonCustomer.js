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
    name: "purchaseYesOrNo",
    type: "rawlist",
    message: "Would you like to purchase an item?",
    choices: ["Yes", "No"]
  }).then(function (answer) {
    if (answer.purchaseYesOrNo == "Yes") {
      purchaseRequest();
    } else {
      console.log("\nI think you do.\n")
      start();
    }
  })
}

// Purchase function
var purchaseRequest = function () {
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
            name: "quantityRequest",
            type: "input",
            message: "How many items would you like to purchase?",
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