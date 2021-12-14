const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

function verifyAccessToken (token) {
    return jwt.verify(token, SECRET_KEY);
}

module.exports = verifyAccessToken;