'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
    name: DataTypes.STRING,
	price: DataTypes.DECIMAL,
	weight: DataTypes.INTEGER,
	packing: DataTypes.STRING,
	code: DataTypes.STRING,
    description: DataTypes.TEXT,
	img: DataTypes.ARRAY(DataTypes.STRING),
	genre: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};