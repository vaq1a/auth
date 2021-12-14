const verifyAccessToken = require("../utils/verifyAccessToken");

function roleMiddleware (roles) {
    return (req, res, next) => {
        if(req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(400).json({"message": "user isn't authorization"})
            }

            const data = verifyAccessToken(token);

            if(roles.includes(data.role[0])) {
                next();
            } else {
                return res.json({"message": "no rights", "users": []});
            }
        } catch (e) {
            return res.status(400).json({"message": "user isn't authorization"});
        }
    }
}

module.exports = roleMiddleware;