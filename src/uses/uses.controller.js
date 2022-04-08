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
    res.json({data: uses});
}

// REFACTOR TO USE WITH '/urls/:urlId/'
const read = (req, res) => {

}

const destroy = (req, res) => {

}

module.exports = {
    list,
    read: [useExists, read],
    delete: [useExists, destroy]
}