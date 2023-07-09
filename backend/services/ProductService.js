module.exports = app => {
  
  const save = async (product) => {

    app.services.ValidationService.existsOrError(product.name, 'Name does not informed');
    
    if(product.id) {
        app.repositories.ProductRepositoryNoSql.update(product);

        return await app.repositories.ProductRepository.update(product);
    } 

    // example save in mongoDB
    app.repositories.ProductRepositoryNoSql.insert(product);

    return await app.repositories.ProductRepository.insert(product);
  }

  const remove = async (id) => {
      app.services.ValidationService.existsOrError(id, 'Código do produto não informado.');

      const rowsDeleted = await app.repositories.ProductRepository.remove(id);
     
      app.services.ValidationService.existsOrError(rowsDeleted, 'Product não encontrado.');

      return rowsDeleted;
  }  

  const get = async (paramPage, paramPageSize) => {
    
    const DEFAULT_PAGE_SIZE = 10;

    const page = parseInt(paramPage) || 0;
    const pageSize = parseInt(paramPageSize) || DEFAULT_PAGE_SIZE;
    
    const offset = page * pageSize;

    const totalCount = await app.repositories.ProductRepository.getCount();
    const totalItems = parseInt(totalCount[0].totalItems);
    const totalPages = parseInt(totalItems / pageSize + 1);

    const dataReturn = await app.repositories.ProductRepository.get(offset, pageSize);

    return  {
      data: dataReturn,
      totalItems: totalItems, 
      totalPages: totalPages,
      currentPage: page
    }

  }

  const getById = (id) => {
    
    return app.repositories.ProductRepository.getById(id);
  }

  return { save, remove, get, getById }
};

