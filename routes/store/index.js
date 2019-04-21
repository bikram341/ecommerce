var express = require('express');
var router = express.Router();

const LTT = require('list-to-tree');
const categories = require('../../controllers/store/category_controller');

/* GET home page. */
router.get('/',function(req,res,next){
	res.render('store/index',{layout : 'store/auth/auth_layout', title : 'Login'})
});


router.get('/login',function(req,res,next){
	res.render('store/auth/login',{layout : 'store/layout', title : 'Dashborad'})
});


router.get('/categories',async function(req,res){

	await categories.allCategories().then(result => {
		//console.log(result);
		
		let array = [];
		for(key in result)
		{
			array.push(result[key].dataValues);
		}

		

		

		var ltt = new LTT(array, {
        	key_id: 'id',
        	key_parent: 'parent_id'
    	});

    	var tree = ltt.GetTree();

    	console.log( tree );
    	/*console.log( tree[0] );

    	console.log( tree[1] );

    	console.log( tree[2] );*/

		res.render('store/category/index',{layout : 'store/layout', title : 'Categories', data : tree});
	}).catch(err => {
		console.log(err);
	});

});

router.get('/category/add',async function(req,res){
	try{
		const data = await categories.allCategories();
		const datas = data.map(sdata=>sdata.dataValues);
		console.log(datas);
		res.render('store/category/create',{layout : 'store/layout',title : 'New Category', data : datas});
	}
	catch(err)
	{
		console.log(err);
	}
});

router.post('/category/save',async function(req,res){
	
	const parent_id = req.body.parent_id;
	const name = req.body.name;

	if(name == '')
	{
		req.flash('error_msg','Category Name is required');
		res.redirect('/store/category/add');
	}

	try{
		const data = {parent_id : parent_id, name: name};
		await categories.saveCategory(data).then(sdata => {
			req.flash('success_msg','Category added successfully');
			res.redirect('/store/categories');
		}).catch(err => {
			console.log(err);
		});
	}
	catch(err){
		console.log(err);
	}
});

module.exports = router;
