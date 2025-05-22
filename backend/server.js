import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import  connection  from './config/connectDB.js';
import userRouter from './routes/userRouter.js';
import questionRouter from "./routes/questionRouter.js"
import feedbackRouter from "./routes/feedbackRouter.js"
import userprofileRouter from "./routes/userProfileRouter.js"
import chatBotRoter from "./routes/chatbotRouter.js";


import cors from 'cors';

// Add this before your route definitions

// Load environment variables from .env file
dotenv.config();

//creating an object of express
const app = express();
app.use(cors());

//The cookieParser middleware reads cookies from the incoming requests and makes them accessible via req.cookies
app.use(cookieParser());

//converts the request body from JSON format into a JavaScript object, allowing you to easily access the data using req.body
app.use(express.json());

// It handles form submissions where data is sent as key-value pairs (like from an HTML form)
app.use(express.urlencoded({ extended: true }));



// Use a default port if not provided in the environment variables
const PORT = process.env.BACKEND_URL || 4000;


// Example route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});


//define signup route
app.use("/api/v1/user", userRouter)
app.use("/api/v1/question", questionRouter)
app.use("/api/v1/feedbackform", feedbackRouter)
app.use("/api/v1/userprofile", userprofileRouter)
app.use('/api/v1/ai', chatBotRoter);

//Establish connection with database
connection()

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});

export default app;