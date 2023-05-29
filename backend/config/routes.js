const admin = require('./admin.js');

module.exports = app => {

    app.route('/products/:id')
        .put(app.api.ProductController.save)
        .get(app.api.ProductController.getById)
        .delete(app.api.ProductController.remove);

    app.route('/products')
        .post(app.api.ProductController.save)
        .get(app.api.ProductController.get);

}