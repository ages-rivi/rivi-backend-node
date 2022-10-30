function addMiddleware(app) {
  app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
    return app;
  });
}

module.exports = { addMiddleware };
