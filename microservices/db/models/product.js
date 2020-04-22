'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price_habad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    schema: 'microservice-order',
  });
  Product.associate = function(models) {
    Product.hasMany(models.Order); // One product is in severals order --> Create ProductId in Order
  };
  return Product;
};
