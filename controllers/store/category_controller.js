const categories = require('../../models/store/category_model');

exports.allCategories = function(){
	const store_id = 1;
	return categories.getAllCategories(store_id);
}

exports.saveCategory = function(data){
	
	let slug = data.name;
	slug = slug.toLowerCase();
	slug = slug.replace(' ','-');
	const store_id = 1;

	data.store_id = store_id;
	data.slug = slug;

	return categories.addNew(data);
	
}