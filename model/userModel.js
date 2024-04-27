const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please provide a name'],
        minlenght: [4, 'min lenght for username is 4']
    },
    email: {
        type: String,
        required: [true, 'please provide an email address'],
        unique: true

    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlenght: [8, 'password min lenght must be 8']
    }
}, { timestamps: true });


//hashing passwords before saving it into the database 
userSchema.pre("save", async function (next) {

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})


//passwords comparison
userSchema.methods.comparePassword = async function (userPassword) {
    const isCorrect = await bcrypt.compare(userPassword, this.password);
    return isCorrect
}


//generate token
// generate token
userSchema.methods.generateToken = async function (params) {
    let token = jwt.sign({ userId: this._id }, process.env.JWT_SECRETE);
    return token;
}

const USER = mongoose.model('user', userSchema);
module.exports = USER