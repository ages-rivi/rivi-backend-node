require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

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

  app.use('/api/pesquisadores', require('./routes/pesquisadores'));
  //app.use('/api/projetos', require('./routes/projetos'));
