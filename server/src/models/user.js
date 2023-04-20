const {Schema,model} = require("mongoose");

const userSchema = new Schema({
    name: {
        type : String,
        trim : true,
        required: [true , "name is required"],
        minlength: [2,"Minimum length of name is 2"],
        maxlength: [100, "Maximum length should be 10"]
    },
    email: {
        type : String,
        required : [true, "User email is required"],
        unique : true,
        trim : true,
        lowercase: true,
        validate : {
            validator: function (v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message : "Please Enter a Valid Email"
        }
    },
    password: {
        type: String,
        required: [true, "password is required"],
        min: 6
    },
    phone: {
        type: String,
        required: [true, "User phone number is required"],
        min: 10
    },
    is_admin: {
        type: Number,
        default: 0
    },
    is_verfied: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image:{
        type: String,
        default: "../../src/public/images/users/image.JPG"
    },
    isBanned:{
        type: Boolean,
        default: false
    }
});

const User = model("users", userSchema);

module.exports = User;