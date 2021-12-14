const User = require("../models/userModel");
const Role = require("../models/roleModel");
const cryptPass = require("../utils/cryptPass");
const {validationResult} = require("express-validator");
const generateAccessToken = require("../utils/generateAccessToken");

class userController {
    async login(req, res) {
        try {
            const result = validationResult(req);

            if(!result.isEmpty()) {
                return res.status(400).json({"message": result});
            }

            const {body: {login, password}} = req;

            const user = await User.findOne({login});

            if (!user) {
                return res.json({"message": `user isn't find`});
            }

            if (cryptPass.decrypt(password, user.password)) {
                let token = generateAccessToken(user._id, user.role);

                return res.status(200).json({"message": "Success sign in", user, token});
            } else {
                return res.json({"message": `password isn't true`});
            }

        } catch (error) {
            return res.json({"message": `login error: ${error}`});
        }
    }

    async registration(req, res) {
        try {
            const result = validationResult(req);

            if(!result.isEmpty()) {
                return res.json({"message": result});
            }

            const {body: {login, password}} = req;

            const presence = await User.findOne({login});
            const role = await Role.findOne({value: "USER"});

            if(presence) {
                res.json({"message": "Choiced login is busy"});
            } else {
                const user = {
                    login,
                    password: cryptPass.crypt(password),
                    role: [role.value],
                }

                await User.create(user, (error, data) => {
                    if (error) {
                        return res.json({"message": "Created with errors"});
                    }
                });

                res.status(200).json({"message": "success sign up"});
            }
        } catch (error) {
            return res.json({"message": `registration error: ${error}`})
        }
    }

    async getAll(req, res) {
        const {user} = req;

        try {
            const users = await User.find();

            if(users.length !== 0) {
                return res.status(200).json({users});
            } else {
                return res.status(400).json({"message": `users empty`})
            }

        } catch (error) {
            return res.status(400).json({"message": `get all error: ${error}`})
        }
    }

    async addRoles(req, res) {
        try {
            await Role.create({value: 'USER'}, (error, role) => {
                if (error) return res.status(400).json({"message": `create USER role error: ${error}`});
            });

            await Role.create({value: 'ADMIN'}, (error, role) => {
                if (error) return res.status(400).json({"message": `create ADMIN role error: ${error}`});
            });

            return res.status(200).json({"message": "success"});
        } catch (error) {
            return res.status(400).json({"message": `add roles error ${error}`});
        }
    }
}

module.exports = new userController();