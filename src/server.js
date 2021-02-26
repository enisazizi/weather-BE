const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const services = require("./routes")

const {
	notFoundHandler,
	genericErrorHandler,
	badRequestHandler,
	forbiddenError,
	unauthorizedError,
} = require("./middlewares/errorHandling")
const passport = require("passport");
const oauth = require("./middlewares/oauth");
const cookieParser = require("cookie-parser");
const server = express()

const port = process.env.PORT || 3003
const mongoDb = process.env.MONGODB 

mongoose.connect(mongoDb,{
    useNewUrlParser:true,
    useUnifiedTopology:true, 
})
.then(()=> console.log("Connected to DB"))
.catch((err)=>console.log("DB connetion error",err))


const whitelist = [process.env.REDIRECT_URL];
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true, //Allow cookie
};


server.use(cors(corsOptions));
server.use(express.json())
server.use(passport.initialize());
server.use(cookieParser());
server.use("/api",services)

server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(forbiddenError);
server.use(unauthorizedError);
server.use(genericErrorHandler);

server.listen(port, () => {
	if (server.get("env") === "production") {
		console.log("Server is running on CLOUD on port:", port);
	} else {
		console.log("Server is running on LOCALLY on port:", port);
	}
})