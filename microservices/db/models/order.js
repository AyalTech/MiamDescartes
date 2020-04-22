'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_jour: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_mois: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    schema: 'microservice-order',
  });
  Order.associate = function(models) {
    Order.belongsTo(models.User);
    Order.belongsTo(models.Product);
  };
  return Order;
};
