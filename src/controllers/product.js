const { Product } = require("../models");
const fs = require('fs');

//get all products
const getAll =  async (req, res, next) => {
	const products = await Product.findAll();
  	if (products.length === 0) {
		const err = new Error("No hay productos");
		err.status = 404;
		next(err);
		return;
  	}
  	if (!products) {
	  	const err = new Error("No se pudo obtener los productos");
	  	err.status = 500;
	  	next(err);
	  	return;
  	}
  	return res.send(products);
};

//get product by id
const getById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.json(product);
};

//create product
const create = async (req, res) => {
	let sampleFile;
  	let uploadPath;
	let pack = [];
	let img = [];
	let genre = [];
	req.body.genre.split(",").forEach(element => {
		if (element !== null || element !== undefined || element !== "") 
			genre.push(element);
	});
	if (Array.isArray(req.body.weight) === false) {
		pack.push({weight: req.body.weight, price: req.body.price, packing: req.body.packing});
	}
	else {
		for (let i = 0; i < req.body.weight.length; i++) {
			pack.push({weight: req.body.weight[i], price: req.body.price[i], packing: req.body.packing[i]});
		}
	}
 	 if (!req.files || Object.keys(req.files).length === 0) {
    	return res.status(400).send('No files were uploaded.');
  	}
	//make a direcotry for product image
	const dir = __dirname.replace("controllers", "public\\images\\product\\" + req.body.name);
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	if(Array.isArray(req.files.sampleFile) === false) {
		sampleFile = req.files.sampleFile;
		uploadPath = __dirname.replace("controllers", "public\\images\\product\\" + req.body.name + "\\" + sampleFile.name);
  		sampleFile.mv(uploadPath, function(err) {
    	if (err)
    	  	return res.status(500).send(err);
		});
		img.push('https://siembrasanaapi-dev-ghhz.2.ie-1.fl0.io/images/product/' + req.body.name + "/" + sampleFile.name);
	} else {
		for (let i = 0; i < req.files.sampleFile.length; i++) {
	  		sampleFile = req.files.sampleFile[i];
	  		uploadPath = __dirname.replace("controllers", "public\\images\\product\\" + req.body.name + "\\" + sampleFile.name);
	  		sampleFile.mv(uploadPath, function(err) {
	    	if (err)
	    	  	return res.status(500).send(err);
			});
			img.push('https://siembrasanaapi-dev-ghhz.2.ie-1.fl0.io/images/product/' + req.body.name + "/" + sampleFile.name);
		};
	}
	const product = await Product.create({
		name: req.body.name,
		code: req.body.productCode,
		description: req.body.description,
		pack: pack,
		img: img,
		genre: genre,
	});
	res.send(product);
};

//update product
const update = async (req, res) => {
	let pack = [];
	let img = [];
	let genre = [];
	req.body.genre.split(",").forEach(element => {
		if (element !== null || element !== undefined || element !== "") 
			genre.push(element);
	});
	if (Array.isArray(req.body.weight) === false) {
		pack.push({weight: req.body.weight, price: req.body.price, packing: req.body.packing});
	}
	else {
		for (let i = 0; i < req.body.weight.length; i++) {
			pack.push({weight: req.body.weight[i], price: req.body.price[i], packing: req.body.packing[i]});
		}
	}
	const dir = __dirname.replace("controllers", "public\\images\\product\\" + req.body.name);
	fs.rmSync(__dirname.replace("controllers", "public\\images\\product\\" + req.body.oldName), { recursive: true });
	fs.mkdirSync(dir);
	if(req.files === null) {
		req.body.img.split(",").forEach(element => {
			img.push(element);
		});
	} else{
		if(Array.isArray(req.files.sampleFile) === false) {
			sampleFile = req.files.sampleFile;
			uploadPath = __dirname.replace("controllers", "public\\images\\product\\" + req.body.name + "\\" + sampleFile.name);
	  		sampleFile.mv(uploadPath, function(err) {
	    	if (err)
	    	  	return res.status(500).send(err);
			});
			img.push('https://siembrasanaapi-dev-ghhz.2.ie-1.fl0.io/images/product/' + req.body.name + "/" + sampleFile.name);
		} else {
			for (let i = 0; i < req.files.sampleFile.length; i++) {
		  		sampleFile = req.files.sampleFile[i];
		  		uploadPath = __dirname.replace("controllers", "public\\images\\product\\" + req.body.name + "\\" + sampleFile.name);
		  		sampleFile.mv(uploadPath, function(err) {
		    	if (err)
		    	  	return res.status(500).send(err);
				});
				img.push('https://siembrasanaapi-dev-ghhz.2.ie-1.fl0.io/images/product/' + req.body.name + "/" + sampleFile.name);
			};
		}
	}
	await Product.update({
		name: req.body.name,
		code: req.body.productCode,
		description: req.body.description,
		pack: pack,
		img: img,
		genre: genre,
	}, {
		where: { id: req.params.id },
	  });
  res.json({ success: "Product updated" });
};

//delete product
const remove = async (req, res) => {
	//remove directory for product image
	const product = await Product.findByPk(req.params.id);
	fs.rmSync(__dirname.replace("controllers", "public\\images\\product\\" + product.name), { recursive: true });
  await Product.destroy({
	where: { id: req.params.id },
  });
  res.json({ success: "Product deleted" });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};