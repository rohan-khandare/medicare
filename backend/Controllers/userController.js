
import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async(req,res)=>{
    const id =req.params.id

    try {
        const updatedUser =await User.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true }
        );

        res.status(200).json({
            success:true,
            message:"Successfully updated",
            data:updatedUser,
        });

    } catch (err) {
        res.status(500).json({ success:false, message:"Failed to update" });
    }
};


export const deleteUser = async(req,res)=>{
    const id =req.params.id

    try {
        await User.findByIdAndDelete(
            id,
           
        );

        res.status(200).json({
            success:true,
            message:"Successfully deleted",
        });

    } catch (err) {
        res.status(500).json({ success:false, message:"Failed to delete" });
    }
};

// export const getSingleUser = async(req,res)=>{
//     const id =req.params.id

//     try {

//         const user =await User.findById(id);

//         res.status(200).json({
//             success:true,
//             message:"User found ",
//             data:user,
//         });

//     } catch (err) {
//         res.status(404).json({ success:false, message:"User not found" });
//     }
// };

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select('-password');
        res.status(200).json({
            success: true,
            message: "User found",
            data: user,
        });
    } catch (err) {
        res.status(404).json({ success: false, message: "No User found" });
    }
};

export const getAllUser = async(req,res)=>{
    
    try {
        const users =await User.find({}).select('-password');

        res.status(200).json({
            success:true,
            message:"Users found",
            data:users,
        });

    } catch (err) {
        res.status(404).json({ success:false, message:"Not found" });
    }
};

export const getUserProfile = async(req,res)=>{
    // const  userId =req.userId
    // const { userId } = req.body;
    const userId = req.params.id; // Get user ID from route parameter

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({success:false,message:'User not found'});
        }

        const {password, ...rest} = user._doc
        res.status(200).json({success:true,message:'profile info is getting', data:{...rest}});  
        
    } catch (err) {
        return res.status(500).json({success:false,message:err.message});    
    }
}

export const getMyAppointments = async (req, res) => {
    const userId = req.params.id; // Get user ID from route parameter

    try {
        // Step 1: Retrieve appointments from bookings for a specific user
        const bookings = await Booking.find({ user: userId });

        // Step 2: Extract doctor IDs from appointments bookings
        const doctorIds = bookings.map(el => el.doctor);

        // Step 3: Retrieve doctors with the extracted doctor IDs
        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password');

        res.status(200).json({ success: true, message: "Appointments retrieved successfully", data: doctors });
    } catch (err) {
        console.error('Error fetching appointments:', err);
        return res.status(500).json({ success: false, message: 'Something went wrong, cannot get appointments' });
    }
};
