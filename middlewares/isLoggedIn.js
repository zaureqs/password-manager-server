const prisma = require("../prisma/prismaClient");
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
    try {
        const { token } = req.body;
        
        if (!token) {
            res.status(401).send('Please log in')
            throw new Error('user not Logged in');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use jwt.verify to decode the token
        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        });
        // You can do more checks
        next();
    } catch (error) {
        console.log({error});
        res.send('Middleware failed '+ error);
    }
};

module.exports = isLoggedIn;
