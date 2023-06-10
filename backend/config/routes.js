const admin = require('./admin.js');

module.exports = app => {

    // as 3 unicas urls que nao serao protegidas (serao publicas)
    app.post('/signup', app.api.user.save);
    app.post('/signin', app.api.auth.signin);
    app.post('/validateToken', app.api.auth.validateToken);


    app.route('/products/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.ProductController.save)
        .get(app.api.ProductController.getById)
        .delete(app.api.ProductController.remove);

    app.route('/products')
        .all(app.config.passport.authenticate())
        .post(app.api.ProductController.save)
        .get(app.api.ProductController.get);

}