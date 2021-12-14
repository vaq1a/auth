const verifyAccessToken = require("../utils/verifyAccessToken");

function authMiddleware(req, res, next) {
    if(req.method === 'OPTIONS') {
        next();
    }
    
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(400).json({"message": "user isn't authorization"})
        }

        req.user = verifyAccessToken(token);

        next();
    } catch (e) {
        return res.status(400).json({"message": "user isn't authorization"});
    }
}

module.exports = authMiddleware;