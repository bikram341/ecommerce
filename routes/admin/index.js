var express = require('express');
var router = express.Router();

const stores = require('../../controllers/admin/store_controller');

/* GET home page. */
router.get('/login',function(req,res,next){
	res.render('admin/auth/login',{layout : 'admin/auth/auth_layout', title : 'Login'})
});

router.get('/', function(req, res, next) {
  res.render('admin/index', { layout : 'admin/layout',title: 'Dashboard' });
});

router.get('/stores', async function(req, res, next) 
{
	try{
		const data = await stores.allStores();
		const storeData=data.map(sdata=>sdata.dataValues);
		console.log('data====',storeData);
		res.render('admin/store/index', { layout : 'admin/layout',title: 'Stores', data : storeData });
	}
	catch(err){
		res.render('admin/store/index', { layout : 'admin/layout',title: 'Stores', data : [] });
	}
	
});

router.get('/store/add', function(req, res, next) {
  res.render('admin/store/create', { layout : 'admin/layout',title: 'New Store' });
});

router.post('/store/save',async function(req,res,next){
	const data = {name : req.body.name, email : req.body.email, mobile : req.body.mobile, password : req.body.password};
	await stores.store(data).then(result => {
		//console.log(result.dataValues);
		req.flash('success_msg','Registration is Successfull');
		res.redirect('/admin/stores');
	}).catch(err => {
		//console.log(err);
		if('error' in err)
		{
			req.flash('error_msg',err.error);
			res.redirect('/admin/store/add');
		}
	});
	//console.log('in route');
	//res.redirect('/admin/stores');

});

router.get('/store/:id/details', function(req, res, next) {
  res.render('admin/store/show', { layout : 'admin/layout',title: 'Store' });
});

module.exports = router;
