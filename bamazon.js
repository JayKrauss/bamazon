
var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 8080,

	user: 'root',

	password: 'Jak4234',
	database: 'Bamazon'
});

function pullInventory() {

	pullString = 'SELECT * FROM products';

	connection.query(pullString, function(err, data) {
		if (err) throw err;

		console.log('Current Inventory: ');
		console.log('...................\n');

		var communication = '';
		for (var i = 0; i < data.length; i++) {
			communication = '';
			communication += 'Item ID: ' + data[i].item_id + '  //  ';
			communication += 'Product Name: ' + data[i].product_name + '  //  ';
			communication += 'Department: ' + data[i].department_name + '  //  ';
			communication += 'Price: $' + data[i].price + '\n';

			console.log(communication);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	startPurchase();
	})
}

function startPurchase() {

	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID you are looking to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'amount',
			message: 'How many are you buying?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
		
		var item = input.item_id;
		var amount = input.amount;

		var pullString = 'SELECT * FROM products WHERE ?';

		connection.query(pullString, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID.');
				pullInventory();

			} else {
				var productData = data[0];
				if (amount <= productData.stock_amount) {
					console.log('The requested product is in stock. Placing order..');

					var updatepullString = 'UPDATE products SET stock_amount = ' + (productData.stock_amount - amount) + ' WHERE item_id = ' + item;

					connection.query(updatepullString, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed. Your total is $' + productData.price * amount);
						console.log("\n---------------------------------------------------------------------\n");
						connection.end();
					})
				} else {
					console.log('Sorry, we do not have that product in stock.');
					console.log('Please change your order.');
					console.log("\n---------------------------------------------------------------------\n");

					pullInventory();
				}
			}
		})
	})
}

function validateInput(value) {
	var number = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (number && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole number greater than zero.';
	}
}

function runBamazon() {
	pullInventory();
}

runBamazon();