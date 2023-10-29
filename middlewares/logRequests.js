const logRequests = (req,res,next) => {
    console.log("Received a request:", req.method, req.path , Date.now());
    next();
};

module.exports = logRequests;