
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async(req,res)=>{
    const id =req.params.id

    try {
        const updateDoctor =await Doctor.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true }
        );

        res.status(200).json({
            success:true,
            message:"Successfully updated",
            data:updateDoctor,
        });

    } catch (err) {
        res.status(500).json({ success:false, message:"Failed to update" });
    }
};


export const deleteDoctor = async(req,res)=>{
    const id =req.params.id

    try {
        await Doctor.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"Successfully deleted",
        });

    } catch (err) {
        res.status(500).json({ success:false, message:"Failed to delete" });
    }
};

export const getSingleDoctor = async(req,res)=>{
    const id =req.params.id

    try {
        const doctor =await Doctor.findById(id).populate("reviews").select('-password');

        res.status(200).json({
            success:true,
            message:"doctor found ",
            data:doctor,
        });

    } catch (err) {
        res.status(404).json({ success:false, message:"Doctor not found" });
    }
};

// export const getAllDoctor = async(req,res)=>{
   
//     try {
//         const doctors =await Doctor.find({}).select('-password');

//         res.status(200).json({
//             success:true,
//             message:"doctors found ",
//             data:doctors,
//         });

//     } catch (err) {
//         res.status(404).json({ success:false, message:" NO Doctor found" });
//     }
// };

// if doctors are not apporved by admin will get empty array if condition is removed, we'll get all registered doctors 

export const getAllDoctor = async (req, res) => {
    try {
        const { query } = req.query;
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                isApproved: 'approved',
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } },
                ],
            }).select("-password");
        } else {
            doctors = await Doctor.find({ isApproved: "approved" }).select('-password');
        }

        res.status(200).json({
            success: true,
            message: "Doctors found",
            data: doctors,
        });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found", error: err.message });
    }
};


export const getDoctorProfile =async(req,res)=>{
   
    // const  doctorId =req.doctorId
    const doctorId = req.params.id; 

    try {
        const doctor = await Doctor.findById(doctorId)

        if (!doctor) {
            return res.status(404).json({success:false,message:'doctor not found'});
        }

        const {password, ...rest} = doctor._doc;
        const appointments = await Booking.find({doctor:doctorId})
        res.status(200).json({success:true,message:'profile info is getting', data:{...rest,appointments}});  
    } catch (err) {
        return res.status(500).json({success:false,message:'Something went wrong, cannot get'});
        
    }

}
