require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const logRequests = require('./middlewares/logRequests');


const app = express();

const PORT = process.env.PORT;

app.use(helmet());


//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//cookie middlewares
app.use(cookieParser());



// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }));

app.use(cors());



  const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)



app.use(logRequests);

const userRouter = require("./routes/userRoutes");
const secretRouter = require("./routes/secretRoutes");

app.use('/api/v1/user', userRouter);
app.use('/api/v1/secret', secretRouter);


app.get("/", (req, res) => {
    res.send("Welcome to the app!");
});



app.listen(PORT, () => {
    console.log("server started at port :" + PORT);
})
