require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const pesquisadoresRoutes = require('./routes/pesquisadores');
const artigosRoutes = require('./routes/artigos');

// express app
const app = express();
app.use(express.json());
// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// connect to mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to mongo & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/api/pesquisadores', pesquisadoresRoutes);
app.use('/api/artigos', artigosRoutes);