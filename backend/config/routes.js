const admin = require('./admin.js');

module.exports = app => {

    // 3 uniques URLs don't be protected (they're publics)
    app.post('/signup', app.api.user.save);
    app.post('/signin', app.api.auth.signin);
    app.post('/validateToken', app.api.auth.validateToken);


    app.route('/products/id/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.ProductController.save)
        .get(app.api.ProductController.getById)
        .delete(app.api.ProductController.remove);

    app.route('/products/name/:name')
        .all(app.config.passport.authenticate())
        .get(app.api.ProductController.getByName);

    app.route('/products')
        .all(app.config.passport.authenticate())
        .post(app.api.ProductController.save)
        .get(app.api.ProductController.get);

}