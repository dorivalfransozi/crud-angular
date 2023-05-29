
exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNull();
        table.decimal('price').notNull();
    });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
