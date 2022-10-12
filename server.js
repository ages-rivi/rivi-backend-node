require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// express app
const app = express();
app.use(express.json());

// register swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
console.log('Swagger running on http://localhost:4000/api-docs');

// register middleware
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
      console.log('Connected to mongo & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// set routes
app.use('/api/pesquisadores', require('./routes/pesquisadores'));
app.use('/api/artigos', require('./routes/artigos'));
app.use('/api/projetos', require('./routes/projetos'));
