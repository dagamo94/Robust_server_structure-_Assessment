const express = require("express");
const app = express();

const urlsRouter = require("./urls/urls.router");
const usesRouter = require("./uses/uses.router");

app.use(express.json());

// TODO: Add code to meet the requirements and make the tests pass.

// INVOKE URLS AND USES ROUTERS ON THEIR RESPECTIVE ROUTES' STARTING POINTS
app.use("/urls", urlsRouter);
app.use("/uses", usesRouter);

// ------ ERROR HANDLING -------
// ROUTE NOT FOUND HANDLER
app.use((req, res, next) =>{
    next({
        status: 404,
        message: `Route not found: ${req.originalUrl}`
    })
})

// ERROR HANDLER (ERR, REQ, RES, NEXT)
app.use((err, req, res, next) =>{
    console.error(err);
    const {status = 500, message = `Something went wrong: Internal server error.`} = err;
    res.status(status).json({error: message});
})

module.exports = app;
