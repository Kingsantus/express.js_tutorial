const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.orign;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Controls-Allow-Credentials', true);
    }
    next();
}
module.exports = credentials;