const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

function generateAccessToken (id, role) {
    const header = {
        id,
        role,

    }

    return jwt.sign(header, SECRET_KEY, {expiresIn: "24h"});
}

module.exports = generateAccessToken;