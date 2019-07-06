# bamazonCustomer and bamazonManager

### Overview

This bamazon application is a mySQL and node product database application designed for the UMN Coding Bootcamp's homework assignment by Ian Gacek. The node command line interface uses the "mySQL" and "inquirer" packages.

### Organization

This bamazon file primarily functions from the `bamazonCustomer.js` and `bamazonManager.js` files, with an inquirer flow asking what the user would like to do, then to what product, and finishes with an integer-based question.

## Instructions

To run `bamazonCustomer.js` or `bamazonManager.js`, open git bash and navigate to the folder containing either of the files respectively. Perform the follow command to install the proper node packages:

`npm install`.

If the function above does not work, run the following four commands:

`npm install mysql`
`npm install inquirer`

Now, load mySQL Workbench and start a new server. In a new SQL tab, execute the command contained in the file `bamazon.sql`. After running that schema, run the command contained in the file `addProducts.sql` file to load the `products` table contained in the bamazon.sql database.

After the database is properly loaded, back in terminal, run either commands:

`node bamazonCustomer.js`
-or-
`node bamazonManager.js`

to start the server. If the database in mySQL is properly loaded, the node server for bamazonCustomer.js and bamazonManager.js should work successfully.

## Screenshots

###### bamazonCustomer.js examples

Initial screen after loading `bamazonCustomer.js` file via `node bamazonCustomer.js`:

![bamazonCustomer Example 0](https://github.com/iangacek/bamazon/blob/master/assets/screenshots/bamazonCustomer0.png)

Next screen which displays a list of items available for purchase from the bamazon database:

![bamazonCustomer Example 1](https://github.com/iangacek/bamazon/blob/master/assets/screenshots/bamazonCustomer1.png)

After selecting which product you would like to purchase, you can put in a request for your purchase quantity. If there is enough stock of an item, the purchase will be successful and you will be presented with a total cost. The program will also display the intial quantity of stock before purchase.

![bamazonCustomer Example 2](https://github.com/iangacek/bamazon/blob/master/assets/screenshots/bamazonCustomer2.png)

We can see the mySQL database was updated. The quantity in stock lowered from 7157 to 6157.

![bamazonCustomer Example 3](https://github.com/iangacek/bamazon/blob/master/assets/screenshots/bamazonCustomer3.png)

However if the order fails due to a request that exceeds current stock levels, you will receive an error:

![bamazonCustomer Example 4](https://github.com/iangacek/bamazon/blob/master/assets/screenshots/bamazonCustomer4.png?)

###### bamazonManager.js examples

Initial screen after loading `bamazonManager` file via `node bamazonManager.js`:

![bamazonManager Example 0_0](https://github.com/iangacek/bamazon/blob/master/assets/screenshots/bamazonManager0_0.png)

Selecting option 1 will provide you with a list of all items in the bamazon product database in a JSON format:

![bamazonManager Example 1_0](https://github.com/iangacek/bamazon/blob/master/assets/screenshots/bamazonManager1_0.png)

Selecting option 2 will you provide you with a list of items in the bamazon product database that have fewer than 50 items in stock in a JSON format:

![bamazonManager Example 2_0](https://github.com/iangacek/bamazon/blob/master/assets/screenshots/bamazonManager2_0.png)

Selecting option 3 will provide you the ability to add stock to a certain item. After selecting option 3, a list of items available will then be presented:

![bamazonManager Example 3_0](https://github.com/iangacek/bamazon/blob/master/assets/screenshots/bamazonManager3_0.png)

Next we will be asked how much stock we would like to add:

![bamazonManager Example 3_1](https://github.com/iangacek/bamazon/blob/master/assets/screenshots/bamazonManager3_1.png)

In our example, we added 1500 items to the Galaxy S10 product. Using our stock level of 6157 in our `bamazonCustomer.js` example, we can now see our inventory level of that product is 7657.

![bamazonManager Example 3_2](/assets/screenshots/bamazonManager3_2.png)

## Technologies included in this application: 

`mySQL`:
`[sql](https://www.npmjs.com/package/mysql)

`inquirer`:
`[inquirer](https://www.npmjs.com/package/inquirer)

`mySQL Workbench`:
`[sqlWB](https://www.mysql.com/products/workbench/)

## Credits

Developed by Ian Gacek - 2019.