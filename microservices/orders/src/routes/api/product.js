module.exports = (app, db) => {

  // Créer un produit
  // Access: Private
  app.post('/product', (req,res) => {
    const { title, price, price_habad, category } = req.body;
    if (!title || !price || !price_habad || !category) {
      res.status(400).json({ msg: "Veuillez entrez tout les champs !" })
    }
    db.Product.create({
      title: title.toLowerCase(),
      price,
      price_habad,
      category: category.toLowerCase()
    }).then(products => res.json({
      products
    }))
      .catch(err => res.status(500).json({ err }))
  });

  // Afficher tout les products
  app.get('/products', (req,res) => {
    db.Product.findAll({})
      .then(products => res.json({
        products
      }))
      .catch(err => res.status(500).json({
        err
      }))
  });

  // Chercher un produit par id
  app.get('/products/:id', async (req,res) => {
    try {
      const product = await db.Product.findOne({
        where: {
          id: req.params.id
        }
      })
      if (!product) {
        res.status(404).json({
          msg:"Product id is invalid !"
        })
      }
      res.json({
        product
      })
    }
    catch(err) {
      res.status(500).json({
        err
      })
    }
  });
  // Chercher un produit par category
  app.get('/products/category/:category', async (req,res) => {
    try {
      const products = await db.Product.findAll({
        where: {
          category: req.params.category
        }
      })
      if (!products) {
        res.status(404).json({
          msg:"Product category is invalid !"
        })
      }
      res.json({
        products
      })
    }
    catch(err) {
      res.status(500).json({
        err
      })
    }
  })
}
