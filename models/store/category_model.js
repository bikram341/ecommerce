const sequelize = require('sequelize');
const con = require('../../config/dbConnection');

const categories = con.define('categories',{
	id : {
		type : sequelize.INTEGER,
		autoIcrement : true,
		primaryKey : true
	},
	parent_id : {
		type : sequelize.INTEGER
	},
	name : {
		type : sequelize.STRING
	},
	slug : {
		type : sequelize.STRING
	},
	store_id : {
		type : sequelize.INTEGER
	}
},
{
	timestamps : false,
});

module.exports = categories;

module.exports.getAllCategories = (store_id) => {
	return categories.findAll({where : {store_id : store_id}});
}

module.exports.addNew = (data) => {
	return categories.create(data);
}

