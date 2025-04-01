
import Review from '../models/ReviewSchema.js';
import Doctor from '../models/DoctorSchema.js';

// get all reviews

export const getAllReviews =async (req,res)=>{
        try {
            const reviews =await Review.find({})
            res.status(200).json({success:true, message:"Successful",data:reviews});
    
        } catch (error) {
            res.status(404).json({success:false, message:"Not found"}); 
        }
    };

    // create review
    export const createReview = async (req, res) => {
        try {
            // Validate the request body here if necessary
            
            // Set the doctor and user IDs from route parameters if not provided in the request body
            if (!req.body.doctor) req.body.doctor = req.params.doctorId;
            if (!req.body.user) req.body.user = req.params.userId;
    
            // Create a new review instance with the request body
            const newReview = new Review(req.body);
    
            // Save the review to the database
            const savedReview = await newReview.save();
    
            // Update the doctor document to include the new review ID
            await Doctor.findByIdAndUpdate(req.body.doctor, {
                $push: { reviews: savedReview._id }
            });
    
            // Send a success response with the saved review data
            res.status(200).json({ success: true, message: "Review submitted", data: savedReview });
        } catch (error) {
            // Send an error response if any operation fails
            res.status(500).json({ success: false, message: "Review not submitted", error: error.message });
        }
    };
    
