const Dew = require("../models/dew.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = {
    findAllDews: (req, res) => {
        Dew.find()
        .populate("createdBy", "email")
        .then((allDews)=> {
            console.log(allDews);
            res.json(allDews);
        })
        .catch((err)=>{
            console.log("findAllDews has failed");
            res.json({ message: "Error in findAllDews", error:err})
        })
    },

    createNewDew: (req, res) => {
        const newDewObject = new Dew(req.body);

        const decodedJWT = jwt.decode(req.cookies.userToken,{
            complete: true
        })
        newDewObject.createdBy = decodedJWT.payload.id;

        newDewObject.save()
            .then((newDew) => {
                console.log(newDewObject);
                res.json(newDew);
            })
            .catch((err)=> {
                console.log("error catching newDew")
            })
    },

    findOneDew: (req, res)=>{
        Dew.findOne({_id:req.params.id})
            .populate("createdBy", "email")
            .then((oneDew)=>{
                console.log(oneDew);
                res.json(oneDew);
            })
            .catch((err)=>{
                console.log("findOneDew has failed");
                res.json({message:"Error in findOneDew"});
            })
    },

    deleteOneDew: (req, res)=>{
        Dew.deleteOne({_id:req.params.id})
            .then((deletedDew)=>{
                console.log(deletedDew);
                res.json(deletedDew);
            })
            .catch((err)=>{
                console.log("deletedDew has failed");
                res.json({message:"Error in deletedDew"});
            })
    },

    updateDew: (req, res)=>{
        Dew.findOneAndUpdate({_id:req.params.id},
            req.body,{new: true, runValidators: true})
                .then((updatedDew)=>{
                    console.log(updatedDew)
                    response.json(updatedDew)
                })
                .catch((err)=>{
                    console.log("updateDew has failed");
                    res.json({message:"Error in updateDew"});
                })
    },

    findAllDewsByUser:(req, res)=> {
        if(req.jwtpayload.email !== req.params.email){
            console.log("not the user");

            User.findOne({email: req.params.email})
                .then((userNotLoggedIn)=>{
                    Dew.find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "email")
                        .then((allDewsFromUser)=>{
                            console.log(allDewsFromUser);
                            res.json(allDewsFromUser);
                        })
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
            } else{
                console.log("current user")
                console.log("req.jwtpayload.id:", req.jwtpayload.id);
                Dew.find({ createdBy: req.jwtpayload.id })
                    .populate("createdBy", "email")
                    .then((allDewsFromLoggedInUser) => {
                        console.log(allDewsFromLoggedInUser);
                        res.json(allDewsFromLoggedInUser);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json(err);
                    })
            }
    }
}
