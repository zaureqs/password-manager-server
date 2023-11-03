const prisma = require("../prisma/prismaClient");
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).send('Please log in');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        });

        if (!req.user) {
            return res.status(404).send('User not found');
        }

        if (!req.user.verified) {
            return res.status(200).send({
                success: false,
                message: "User not verified",
            });
        }

        // You can do more checks
        next(); // Call next() to proceed to the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.status(500).send('Middleware failed: ' + error); // Handle errors properly
    }
};

module.exports = isLoggedIn;
