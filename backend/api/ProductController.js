module.exports = app => {

    const save = async (req, res) => {
        try {
            const productReq = { ...req.body };
            if(req.params.id) productReq.id = req.params.id;

            const productRes = await app.services.ProductService.save(productReq);

            res.status(201).json(productRes);
        } catch (msg) {
            console.log(msg);

            res.status(500).send(msg);
        }
    }
          
    const remove = (req, res) => {
        try {
            app.services.ProductService.remove(req.params.id).then(
                res.status(204).send());
        } catch(msg) {
            console.log('Error', msg)

            res.status(400).send(msg);
        }
    }

    const get = (req, res) => {
        console.log(req, req.query, req.query.page, req.query.pageSize, req.params);
        
        app.services.ProductService.get(parseInt(req.query.page), parseInt(req.query.pageSize))
            .then(products => res.json(products))
            .catch(err => res.status(500).send(err));
    }

    const getById = (req, res) => {
        app.services.ProductService.getById(req.params.id)
            .then(products => res.json(products))
            .catch(err => res.status(500).send(err));
    }

    const getByName = (req, res) => {
        app.services.ProductService.getByName(req.params.name)
            .then(products => res.json(products))
            .catch(err => res.status(500).send(err));
    }

    return { save, remove, get, getById, getByName }
}