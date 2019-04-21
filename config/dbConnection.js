const sequelize = require('sequelize');
const connection = new sequelize('ecommerce','root','',{
	host : 'localhost',
	dialect : 'mysql',
	define : {
		timestamps : false
	},
	pool : {
		max : 5,
		min : 0,
		idle : 10000,
		acquire : 30000
	},
	operatorAliases : false
});

connection.authenticate().then(() => {
	console.log('database connection successfull');
}).catch(err => {
	console.log('please check your database connection');
});

module.exports = connection;