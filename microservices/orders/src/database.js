const env = process.env.NODE_ENV || 'development';
const Sequelize = require('sequelize');
const configDatabase = require('./config/config')[env];
require('dotenv').config()

/*
const client = {
  orderDb: new Sequelize(configDatabase.orderSchema, configDatabase.username, configDatabase.password, {
    host: configDatabase.host,
    port: configDatabase.port,
    dialect: configDatabase.dialect,
    timezone: configDatabase.timezone,
  }),
  userDb: new Sequelize(configDatabase.userSchema, configDatabase.username, configDatabase.password, {
    host: configDatabase.host,
    port: configDatabase.port,
    dialect: configDatabase.dialect,
    timezone: configDatabase.timezone,
  })
};
*/

const sequelize = new Sequelize(configDatabase.database, configDatabase.username, configDatabase.password, {
  host: configDatabase.host,
  port: configDatabase.port,
  dialect: configDatabase.dialect,
  timezone: configDatabase.timezone,
})

let table = {};

table.User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  created_time: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updated_time: {
    allowNull: false,
    type: Sequelize.DATE
  },
}, {
  schema: 'microservice-user',
  tableName: "User",
  createdAt: "created_time",
  updatedAt: "updated_time"
})

table.Product = sequelize.define("Product", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price_habad: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: true
  },
  created_time: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updated_time: {
    allowNull: false,
    type: Sequelize.DATE
  },
}, {
  schema: 'microservice-order',
  tableName: "Product",
  createdAt: "created_time",
  updatedAt: "updated_time"
})

table.Order = sequelize.define("Order", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  date_jour: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date_mois: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  created_time: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updated_time: {
    allowNull: false,
    type: Sequelize.DATE
  },
}, {
  schema: 'microservice-order',
  tableName: "Order",
  createdAt: "created_time",
  updatedAt: "updated_time"
})



table.Order.belongsTo(table.User);
table.Order.belongsTo(table.Product);
table.Product.hasMany(table.Order);

module.exports = { sequelize, table};
