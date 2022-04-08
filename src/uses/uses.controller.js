const uses = require("../data/uses-data");

// ********** MIDDLEWARE *********
/* ******************************* */
const useExists = (req, res, next) => {
    const {useId} = req.params;
    const foundUse = uses.find(use => use.id === Number(useId));

    if(foundUse){
        res.locals.use = foundUse;
        return next();
    }

    return next({
        status: 404,
        message: `'use' with ID: ${useId} not found.`
    })
}


// ********** ROUTE HANDLERS *********
/* *********************************** */

// REFACTOR TO USE WITH '/urls/:urlId/'
const list = (req, res) =>{
    const {urlId} = req.params;
    const filterUsesByUrlId = uses.filter(use => use.urlId === Number(urlId));

    if(urlId){
        return res.json({data: filterUsesByUrlId});
    }

    return res.json({data: uses});
}

// REFACTOR TO USE WITH '/urls/:urlId/'
const read = (req, res) => {
    res.json({data: res.locals.use});
}

const destroy = (req, res) => {
    const useIndex = uses.findIndex(use => use.id === Number(res.locals.use.id));
    const deletedUse = uses.splice(useIndex, 1);
    res.status(204).json({data: deletedUse});
}

module.exports = {
    list,
    read: [useExists, read],
    delete: [useExists, destroy]
}