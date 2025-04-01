// import User from "../models/UserSchema.js";
// import Doctor from "../models/DoctorSchema.js";
// import Booking from "../models/BookingSchema.js";

// import Stripe from 'stripe'

// export const getCheckoutSession = async(req,res)=>{
//     try {
//         const { userId } = req.body;
//         // get currently booked doctor
//         const doctor = await Doctor.findById(req.params.doctorId)
//         const user = await User.findById(userId)

//         const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//         //  create stripe checkout session
//         const session = await stripe.checkout.sessions.create({
//            payment_method_types:['card'],
//            mode:'payment',
//            success_url:`${process.env.CLIENT_SITE_URL}/checkout-success`,
//            cancel_url:`${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
//            customer_email:user.email,
//            client_reference_id:req.params.doctorId,
//            line_items:[
//             {
//                 price_data:{
//                     currency:'inr',
//                     unit_amount:doctor.ticketPrice,
//                     product_data:{
//                         name:doctor.name,
//                         description:doctor.bio,
//                         images:[doctor.photo]
//                     }
//                 },
//                 quantity:1
//             }
//            ]
//         })

//         // create new booking
//         const booking = new Booking({
//             doctor:doctor._id,
//             user:user._id,
//             ticketPrice:doctor.ticketPrice,
//             session:session.id
//         })

//         await booking.save()
//         res.status(200).json({success:true, message:'Successfully paid',session})
//     } catch (err) {
//         res.status(500).json({success:false,message:err.message});
//     }
// }


import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Razorpay from 'razorpay';

export const getCheckoutSession = async (req, res) => {
    try {
        
            const { userId } = req.body;
            console.log('Received userId:', userId);

        // Get currently booked doctor
        const doctor = await Doctor.findById(req.params.doctorId);
        const user = await User.findById(userId);

        // Initialize Razorpay with your API keys
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Create a Razorpay order
        const orderOptions = {
            amount: doctor.ticketPrice * 100, // Amount in paisa (multiply by 100 for rupees to paisa conversion)
            currency: 'INR',
            receipt: `order_${doctor.id}_${Date.now()}`, // Unique order receipt ID
            payment_capture: 1, // Auto-capture payment when order is created
        };
        const order = await razorpay.orders.create(orderOptions);

        // Create new booking
        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
            session: order.id, // Use Razorpay order ID as session ID
        });

        await booking.save();

        // Send the order ID and other necessary details to the client
        res.status(200).json({ success: true, orderId: order.id, orderAmount: order.amount });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

