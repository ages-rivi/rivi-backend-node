require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { swaggerDocs } = require('./docs/swagger');
const { connect } = require('./database/mongoose.js');
const { addMiddleware } = require('./middlewares/middleware.js');

// express app
const app = express();
app.use(cors());
app.use(express.json());

// register swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log('Swagger running on http://localhost:4000/api-docs');

// register middleware
addMiddleware(app);

// connect to mongo
connect(app);

// set routes
app.use('/api/pesquisadores', require('./routes/pesquisadores'));
app.use('/api/article', require('./routes/artigos'));
app.use('/api/projeto', require('./routes/projetos'));

app.get('/', (req, res) => {
  res.send('UP!');
});
