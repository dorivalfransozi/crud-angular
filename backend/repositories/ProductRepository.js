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

  const getCount = () => {
    return app.db(tableName).count('id as totalItems');
  }


  const get = (offset, pageSize) => {

    return app.db(tableName)
      .orderBy('name')
      .offset(offset)
      .limit(pageSize);
  }

  const getByName = (name) => {

    return app.db(tableName)
      .orderBy('name')
      .where('name', 'like', `%${name}%`);
  }

  return { getById, insert, update, remove, get, getCount, getByName }

};
