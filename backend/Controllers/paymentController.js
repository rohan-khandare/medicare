
import { instance } from "../index.js";
import Booking from "../models/BookingSchema.js";

import crypto from "crypto";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

// export const checkout =async (req,res)=>{
    
//     const { ticketPrice,userId,doctorId } = req.body;

//     // create order
//     const options ={
//         amount:Number(ticketPrice * 100), //paisa * 100 = rupee
//         currency:"INR",
//         // receipt:"order_rcptid_11",  
//     };
    
//     const order= await instance.orders.create(options);
//     console.log(order);

//     res.status(200).json({
//         success:true,
//         order,
//     });   
// };



export const checkout = async (req, res) => {
    try {

        const { ticketPrice, userId, doctorId } = req.body;
        const doctor = await Doctor.findById(doctorId)
        const user = await User.findById(userId)

        // create order
        const options = {
            amount: parseInt(ticketPrice), // paisa * 100 = rupee
            currency: "INR",
            receipt: "order_rcptid_11",
        };

        const order = await instance.orders.create(options);
        console.log(order);

        // Include additional data in the response
        res.status(200).json({
            success: true,
            order,
            orderId: order.id,
            orderAmount: order.amount,
        });
        
        // create new booking
        try {
            const booking = new Booking({
                doctor: doctor._id,
                user: user._id,
                ticketPrice:doctor.ticketPrice,
            });
           
            await booking.save();
        } catch (err) {
            console.error('Error creating booking:', err);
            // Handle booking creation error, possibly log it for debugging
        }

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }

};


export const paymentVerification = async (req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;    
    
    const expectedSignature= crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET)
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig received ",razorpay_signature);
                                    console.log("sig generated ",expectedSignature);

    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {

        // redirect to frontend
        res.redirect("http://localhost:5173/checkout-success")
    }else{
        res.status(400).json({
            success:false,
        });
    }

};


// Controller function to save a booking without payment 
export const saveBooking = async (req, res) => {
    try {
        const { ticketPrice, userId, doctorId } = req.body;
        const doctor = await Doctor.findById(doctorId)
        const user = await User.findById(userId)

        // Create a new booking instance
        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice:doctor.ticketPrice,
            isPaid:false,
        });

        // Save the booking to the database
        await booking.save();

        // Send a success response
        res.status(201).json({ success: true, message: "Booking saved successfully" });
    } catch (error) {
        // Send an error response if saving fails
        res.status(500).json({ success: false, error: error.message });
    }
};
