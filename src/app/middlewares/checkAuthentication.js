const { loggerWarn } = require("../../config/log4js");

// middleware de authentication
const checkAuthentication = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            //req.isAuthenticated() will return true if user is logged in
            next();
        } else {
            res.json({ error: `No está autenticado.` })
            // res.sendFile("login.html", { root: process.cwd() + '/src/public' });
        }
    } catch (error) {
        loggerWarn.warn(error);
    }
}

module.exports = checkAuthentication;