const Express = require('express');
const app = new Express();
const path = require('path');

const PORT = process.env.PORT || 8001;
const db = require('./src/database');

// const apiAuth = require('./routes/api/auth');
const apiProduct = require('./src/routes/api/product');
const apiOrder = require('./src/routes/api/order');

app.use(Express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
// All routes
// apiAuth(app,db);
apiProduct(app,db.table);
apiOrder(app,db.table);

app.get('/health', (req, res) => {
  console.log('health check');
  res.status(200).send();
})

db.sequelize.sync()
  .then(() => {
    console.log('models orders synced !');
  })
  .catch(err => {
    console.log(err);
  })

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(Express.static('web/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'web', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening in ${PORT}`)
});
