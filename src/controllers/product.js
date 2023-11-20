const { Product } = require("../models");

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
  	return res.json(JSON.stringify(products));
};

//get product by id
const getById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.json(product);
};

//create product
const create = async (req, res) => {
	if(!req.body.name || !req.body.price || !req.body.weight || !req.body.packing || !req.body.code || !req.body.description || !req.body.img || !req.body.genre){
		res.status(400).send({
			error: "Faltan datos"
		});
		return;
	}
  	await Product.create(req.body);
  	return res.json({ success: "Product created" });
};

//update product
const update = async (req, res) => {
  await Product.update(req.body, {
	where: { id: req.params.id },
  });
  res.json({ success: "Product updated" });
};

//delete product
const remove = async (req, res) => {
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