module.exports = app => {
  
  const save = async (product) => {

    app.services.ValidationService.existsOrError(product.name, 'Name does not informed');

    if(product.id) {

        return await app.repositories.ProductRepository.update(product);
    } 

    return await app.repositories.ProductRepository.insert(product);
  }

  const remove = async (id) => {
      app.services.ValidationService.existsOrError(id, 'Código do produto não informado.');

      const rowsDeleted = await app.repositories.ProductRepository.remove(id);
     
      app.services.ValidationService.existsOrError(rowsDeleted, 'Product não encontrado.');

      return rowsDeleted;
  }  

  const get = () => {
    
    return app.repositories.ProductRepository.get();
  }

  const getById = (id) => {
    
    return app.repositories.ProductRepository.getById(id);
  }

  return { save, remove, get, getById }
};

