module.exports = app => {
    const Product = app.mongoose.model('Product', {
        name: String,
        price: Number,
        createAt: Date
    });

    const get = (req, res) => {
        Product.findOne({}, {}, { sort: { 'createAt' : -1 } })
            .then(product => res.json(product));
    }

    const insert = (product) => {
        new Product(product).save().then(() => console.log('Product inserted...'));
    }

    const update = (product) => {
        const filter = { id: '6475521289427b197652100b'};
        const update = { 
            id: '6475521289427b197652100b',
            name: product.name,
            price: product.price
        }
        Product.findOneAndUpdate(filter, update).then(() => console.log('Product updated...'));
    }

    return { Product, get, insert, update }
}