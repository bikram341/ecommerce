const sequelize = require('sequelize');
const con = require('../../config/dbConnection');
const bcrypt = require('bcryptjs');

const stores = con.define('stores',{
	id : {
		type : sequelize.INTEGER,
		autoIcrement : true,
		primaryKey : true
	},
	name : {
		type : sequelize.STRING
	},
	email : {
		type : sequelize.STRING
	},
	mobile : {
		type : sequelize.STRING
	},
	password : {
		type : sequelize.STRING
	},
	remember_token : {
		type : sequelize.STRING
	},
	is_active : {
		type : sequelize.ENUM('Y','N')
	},
	start_date : {
		type : sequelize.DATE
	}
},
{
	timestamps : false,
	hooks : {
		beforeCreate : async function(data){
			const salt = await bcrypt.genSalt(10);
			data.password = await bcrypt.hash(data.password,salt);
		}
	}
});

module.exports = stores;

module.exports.getAllStores = () => {
	return stores.findAll();
}

module.exports.getStoreDetails = (id) => {
	return stores.findOne({where : {id : id}});
}

module.exports.addNew = (data) => {
	return stores.create(data);
}

