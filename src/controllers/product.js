//make an router callbacks for product
const { Product } = require("../models");

//get all products
const getAll =  async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

//get product by id
const getById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.json(product);
};

//create product
const create = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
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