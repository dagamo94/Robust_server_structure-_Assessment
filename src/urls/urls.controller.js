const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

// ********** MIDDLEWARE *********
/* ******************************* */
const urlExists = (req, res, next) => {
    const { urlId } = req.params;
    const foundUrl = urls.find(url => url.id === Number(urlId));

    if (foundUrl) {
        res.locals.url = foundUrl;
        return next();
    }

    return next({
        status: 404,
        message: `URL ID not found: ${urlId}`
    })
}

const hasHref = (req, res, next) => {
    const { data: { href } = {} } = req.body;

    if (href) {
        res.locals.newUrl = href;
        return next();
    }

    next({
        status: 400,
        message: `'href' property is required.`
    })
}


// ********** ROUTE HANDLERS *********
/* *********************************** */
const create = (req, res) => {
    const { newUrl } = res.locals;
    const nUrl = { newUrl, id: urls.length + 1 }

    urls.push(nUrl);
    res.status(201).json({ data: nUrl });
}

const list = (req, res) => {
    res.status(200).json({ data: urls });
}

// EACH GET '/urls/:urlId REQUEST SHOULD CREATE A NEW USE
// push a new USE object to 'uses' array every time read is called
// create middleware?
const read = (req, res) => {
    res.json({ data: res.locals.url });
}

const update = (req, res) => {
    const foundUrl = res.locals.url;

    foundUrl.href = res.locals.newUrl;
    res.status(201).json({data: foundUrl});
}


module.exports = {
    list,
    create: [hasHref, create],
    read: [urlExists, read],
    update: [urlExists, hasHref, update]
}