const { check } = require('express-validator');

class validation {
    registration() {
        return [
            check('login').isString().isLength({min: 4, max: 10}).withMessage("min len = 4, max len = 10"),
            check('password').isString().isLength({ min: 8 }).withMessage("min len = 8")
        ]
    }
}



module.exports = new validation();