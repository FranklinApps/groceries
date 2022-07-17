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
    login: (req, res)=> {
        User.fineOne({email: req.body.email})
        .then((userRecord)=>{
            if(userRecord === null){
                res.status(400).json({message: "Invalid login"})
            } else{
                bcrypt.compare(req.body.password, userRecord.password)
                .then((isPasswordValid)=>{
                    if(isPasswordValid){
                        console.log("Password passed");
                        res.cookie(
                            "userToken",
                            jwt.sign(
                                {
                                    id: userRecord._id,
                                    email: userRecord.email
                                },
                                process.env.JWT_SECRET
                            ),{
                                httpOnly:true,
                                expires: newDate(Date.now() + 9000000)
                            }
                        ).json({
                            message: "success",
                            userLoggedIn: userRecord.email
                        });
                    } else{
                        res.status(400).json({message: "Invalid Attempt"})
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json({message: "Invalid Attempt"})
                })
            }
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json({message: "Invalid Attempt"})
        })
    },

    logout: (req,res) => {
        console.log("logging out");
        res.clearCookie("userToken");
        res.json({
            message: "You are now logged out"
        });
    },
    getLoggedInUser: (req, res)=>{
        User.findOne({_id: req.jwtpayload.id})
            .then((user)=>{
                console.log(user);
                res.json(user)
            })
            .catch((err)=>{
                console.log(err);
            })

    },

    findAllUsers: (req, res) => {
        User.find()
            .then((allUsers) => {
                res.json(allUsers);
            })
            .catch((err) => {
                console.log("Find All Users failed");
                res.json({ message: "Something went wrong in findAll", error: err })
            })
    },

    groceryItems: (req,res) => {
        User.findByIdAndUpdate({_id: req.jwtpayload.id},req.body,{new:true})
            .then((groceries)=>{
                res.json(groceries)
            })
            .catch((err)=>{
                res.json({message: "Failed to enter into grocery items", err})
            })
    }
}