const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
    role: [{type: String, ref: "Role"}]
});

module.exports = model('User', userSchema);