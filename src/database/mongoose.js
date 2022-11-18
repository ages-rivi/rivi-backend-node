const mongoose = require('mongoose');

function connect(app) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      // listen for requests
      app.listen(process.env.PORT, () => {
        console.log('Connected to mongo & listening on port', process.env.PORT);
      });
      return app;
    })
    .catch((error) => {
      return console.log(error);
    });
}

module.exports = { connect };
