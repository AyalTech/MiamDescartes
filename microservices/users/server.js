const Express = require('express');
const app = new Express();
const path = require('path');

const db = require('./src/database');
const PORT = process.env.PORT || 8000;

// const apiAuth = require('./routes/api/auth');
const apiUser = require('./src/routes/api/user');

app.use(Express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// All routes
apiUser(app,db.table);

app.get('/health', (req, res) => {
  console.log('health check');
  res.status(200).send();
})

db.sequelize.sync()
  .then(() => {
    console.log('models synced !');
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
