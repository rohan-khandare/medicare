// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from 'cors';
// import mongoose from "mongoose";
// import dotenv from 'dotenv'; 
// import authRoutes from "./Routes/auth.js";
// import userRoute from "./Routes/user.js";
// import doctorRoute from "./Routes/doctor.js";
// import reviewRoute from "./Routes/review.js";
// import bookingRoute from "./Routes/booking.js";
// import paymentRoute from "./Routes/paymentRoute.js";
// import Razorpay from "razorpay";

// dotenv.config();
// const app = express();
// const port = process.env.PORT || 8000;

// const corsOptions = {
//     origin: function (origin, callback) {
//         console.log('Request Origin:', origin);
//         callback(null, true);
//     }
// };

// app.get('/', (req, res) => {
//     res.send("API is working");
// });

// // Database connection
// mongoose.set('strictQuery',false)
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("DB connected");
//     } catch (err) {
//         console.error("DB connection failed:", err); // Log error if database connection fails
//     }
// };

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors(corsOptions));
// app.use(express.urlencoded({extended:true}));


// // Define routes
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoute);
// app.use('/api/v1/doctors', doctorRoute);
// app.use('/api/v1/reviews', reviewRoute);
// // app.use('/api/v1/bookings',bookingRoute);
// app.use('/api/v1/bookings',paymentRoute);

// export const instance = new Razorpay({
//     key_id:process.env.RAZORPAY_KEY_ID,
//     key_secret:process.env.RAZORPAY_KEY_SECRET,
// });


// // Start server
// app.listen(port, () => {
//     connectDB();
//     console.log("Server is running on port " + port);
// });
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import bookingRoute from "./Routes/booking.js";
import paymentRoute from "./Routes/paymentRoute.js";
import Razorpay from "razorpay";

dotenv.config();
const app = express();

// const corsOptions = {
//     origin: function (origin, callback) {
//         console.log('Request Origin:', origin);
//         callback(null, true);
//     }
// };
const corsOptions = {
    origin: ["https://client-teal-alpha-28.vercel.app"], // Allow frontend
    credentials: true, // Allow cookies/authentication
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("API is working");
});

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected");
    } catch (err) {
        console.error("DB connection failed:", err);
    }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings', bookingRoute);
app.use('/api/v1/payments', paymentRoute);

// Razorpay instance
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Remove `app.listen()`
connectDB();
export default app;
