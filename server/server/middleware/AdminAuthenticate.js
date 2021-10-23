
const jwt = require('jsonwebtoken');
const Admin = require("../model/AdminSchema")

const Authenticate = async (req, res, next) => {

    try {

        const token = req.cookies.admintoken;
        const verifyToken = jwt.verify(token, "MYNAMEISADMINANSARIIAMADEVLOPERANDPRO");

        const rootAdmin = await Admin.findOne({ _id: verifyToken._id, "tokens.token": token })//we acess token in mongo DB from tokens.token

        if (!rootAdmin) {
            throw new Error('User not found')
        }
        //storing all data in req.token,req.rootUser,req.userId
        req.token = token;
        req.rootAdmin = rootAdmin;//if _id matches then all data gets stored in req.rootuser
        req.adminID = rootAdmin._id;

        next();

    } catch (error) {
        res.status(401).send('Unauthorized:No token provided')
        console.log(error);

    }

}

module.exports = Authenticate;
