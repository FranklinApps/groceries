const mongoose = require("mongoose");
const UserScehma = new mongoose.Schema({
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
        required: [true, "Password is required"],
        minLength:[8,"Password must be ath least 8 characters"]
    },
    groceryItems: {
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
