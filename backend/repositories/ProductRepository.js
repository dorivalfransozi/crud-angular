module.exports = app => {

  const tableName = 'products';
  const all = '*';

  const getById = async (productId) => {

    return await app.db(tableName).where({ id: productId }).first();
  }

  const insert = async (product) => {

    return await app.db(tableName).insert(product).returning(all);
  }

  const update = async (product) => {

    return await app.db(tableName).update(product).where({ id: product.id }).returning(all);
  }

  const remove = async (id) => {

    return await app.db(tableName).where({ id: id }).del();
  }

  const get = () => {
    return app.db(tableName).orderBy('name');
  }

  return { getById, insert, update, remove, get }

};
