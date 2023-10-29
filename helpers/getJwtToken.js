const jwt = require("jsonwebtoken");




const getJwtToken = (userId) => {
    return jwt.sign({userId: userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
}


module.exports = getJwtToken;