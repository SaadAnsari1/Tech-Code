const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})


//hashing password
AdminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})


//we are generating token

AdminSchema.methods.generateAuthToken = async function () {  //we use a method of Adminschema
    try {
        let tokenNew = jwt.sign({ _id: this._id }, "MYNAMEISADMINANSARIIAMADEVLOPERANDPRO");//it takes payload(must be unique ex->_id) and secret/private key [options,callback]
        this.tokens = this.tokens.concat({ token: tokenNew }) //it concats(joins string) one token to the other token in the Tokens section of mongoose schema
        await this.save();
        return tokenNew;  //returning token so that we can use it in auth.js
    } catch (error) {                 //we are getting _id from mongodb || this refers to a particular Admin details
        console.log(error);

    }
}



const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
