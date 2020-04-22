const auth = require('../../middleware/isAuthenticated');

module.exports = (app, db) => {
  // create an order
  app.post('/order', auth.isAuthenticated(db), async (req,res) => {
    try {
      const product = await db.Product.findOne({
        where: {
          title: req.body.title
        }
      })
      if(product) {
        try {
          const today = new Date();
          const order = await db.Order.create({
            date: today,
            date_jour: today.getDate(),
            date_mois: today.getMonth() + 1,
            UserId: req.user.user, //give user's id
            ProductId: product.id
          })
          return res.json({
            order
          })
        }
        catch(err) {
          console.log(err)
          return res.status(500).json({err})
        }
      }
      else {
        return res.status(400).json({
          msg: "Ce produit n'existe pas !"
        })
      }
    }
    catch(err){
      return res.status(500).json({err})
    }
  });
  // Give all order of specific user
  app.get('/order/user',auth.isAuthenticated(db), async (req,res) => {
    try {
      const today = new Date();
      const orders = await db.Order.findAll({
        where: {
          UserId: req.user.user,
          date_jour: today.getDate(),
          date_mois: today.getMonth() + 1,
        },
        include: [
          {
            model: db.User
          },
          {
            model: db.Product
          },
        ]
      })
      if (!orders) {
        return res.status(404).json({
          msg:"Pas de commande trouve !"
        })
      }
      return res.json({
        orders
      })
    }
    catch(err) {
      return res.status(500).json({
        err
      })
    }
  })
  // Rechercher les orders données aujourd'hui
  app.get('/order/today',auth.isAdmin(db), async (req,res) => {
    try {
      const today = new Date();
      const orders = await db.Order.findAll({
        where: {
          date_jour: today.getDate(),
          date_mois: new Date().getMonth() + 1
        },
        include: [
          {
            model: db.User
          },
          {
            model: db.Product
          },
        ]
      })
      if (!orders) {
       return res.status(404).json({
          msg:"Pas de commande trouve !"
        })
      }
      return res.json({
        orders
      })
    }
    catch(err) {
      return res.status(500).json({
        err
      })
    }
  })
  // Rechercher les orders d'un jour donnée en paramètre
  app.post('/order/date/', auth.isAdmin(db), async (req,res) => {
    try {
      const { month, day } = req.body;
      const orders = await db.Order.findAll({
        where: {
          date_jour: day,
          date_mois: month
        },
        include: [
          {
            model: db.User
          },
          {
            model: db.Product
          },
        ]
      })
      if (!orders) {
        return res.status(404).json({
          msg:"Pas de commande trouve !"
        })
      }
      return res.json({
        orders
      })
    }
    catch(err) {
      return res.status(500).json({
        err
      })
    }
  })
  // Find order with a specific id
  app.get('/order/:id', auth.isAdmin(db), async (req,res) => {
    try {
      console.log('getOrder')
      const order = await db.Order.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: db.User
          },
          {
            model: db.Product
          },
        ]
      })
      if (!order) {
        return res.status(404).json({
          msg:"Order id is invalid !"
        })
      }
      return res.json({
        order
      })
    }
    catch(err) {
      return res.status(500).json({
        err
      })
    }
  })
  app.delete('/order/:id', auth.isAuthenticated(db), async (req, res) => {
    try {
      const id = req.params.id;
      await db.Order.destroy({
        where: {
          id
        }
      })
      return res.json({
        id
      })
    }
    catch(err) {
      return res.status(500).json({
        err
      })
    }
  })
}
