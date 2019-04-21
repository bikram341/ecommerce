const stores = require('../../models/admin/store_model');

exports.allStores = function(req,res){
	return stores.getAllStores();
	//.then(data => {
	// 	console.log(data);
	// 	return data;
	// }).catch(err => {
	// 	console.log(err);
	// });
}

// promise inside promise
exports.store = function(data){
	if(data.name == '')
	{
		console.log('in controler : Name is required');
		const obj = {error : 'Name is required'};
		return Promise.reject(obj);
	}

	if(data.email == '')
	{
		const obj = {error : 'Email is required'};
		return Promise.reject(obj);
	}

	if(data.mobile == '')
	{
		const obj = {error : 'Mobile is required'};
		return Promise.reject(obj);
	}

	let start_date = new Date();
	let y = (start_date.getFullYear());
	let m = parseInt(start_date.getMonth())+parseInt(1);
	m = ("0"+m).slice(-2);

	console.log('month : ',m);
	let d = ("0"+start_date.getDate()).slice(-2);

	data.start_date = y+'-'+m+'-'+d;
	return stores.addNew(data);
	//console.log(response);
}