const mongoose = require("mongoose");
const bcrypt =  require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        minLength:[2, "First name must be at least two characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength:[2,"Last name must be ath least two characters"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        minLength:[8,"email must be at least 8 characters"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [8,"Password must be at least 8 characters"]
    },
    honeyDewItems: {
        type: Array,
        default: []
    },  

}, {timestamps: true})

UserSchema.virtual("confirmPassword")
.get(()=> this._confirmPassword)
.set((value)=>this._confirmPassword = value)

UserSchema.pre("validate", function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match")
    }
    next();
})

UserSchema.pre("save", function(next){
    console.log("in pre save");
    bcrypt.hash(this.password, 10)
        .then((hashedPassword)=> {
            this.password = hashedPassword;
            next();
        })
})

const User = mongoose.model("User", UserSchema);
module.exports = User;
