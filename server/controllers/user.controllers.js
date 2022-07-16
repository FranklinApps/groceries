const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register: (req, res) => {
        const user = new User(req.body)
        user.save()
            .then((newUser)=>{
            console.log("registration successful: " + newUser);
            res.json({
                successMessage:"You signed up",
                user: newUser
            })
        })
        .catch((err)=>{
            console.log("uh oh we have a problem")
            res.status(400).json(err)
        })
    },

}