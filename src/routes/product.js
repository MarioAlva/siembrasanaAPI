//make router for product
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

//get all products
router.get("/", productController.getAll);
//get product by id
router.get("/:id", productController.getById);
//create product
router.post("/", productController.create);
//update product
router.put("/:id", productController.update);
//delete product
router.delete("/:id", productController.remove);

module.exports = router;