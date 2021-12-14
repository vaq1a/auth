const bcrypt = require("bcrypt");

const SALT_ROUNDS = 4;

class cryptPass {
    crypt(password) {
        return bcrypt.hashSync(password, SALT_ROUNDS);
    }

    decrypt(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
}





module.exports = new cryptPass();

