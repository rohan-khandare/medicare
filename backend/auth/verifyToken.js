
import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';


// export const authenticate = async (req, res, next) => {
//     const authToken = req.headers.authorization;

//     if (!authToken || !authToken.startsWith('Bearer')) {
//         return res.status(401).json({ success: false, message: 'No token, authorization denied' });
//     }

//     try {
//         const token = authToken.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//         req.userID = decoded.id;
//         req.role = decoded.role;

//         console.log(authToken);
//         next();
//     } catch (err) {
//         console.error('Error verifying token:', err);
//         if (err.name === 'TokenExpiredError') {
//             return res.status(401).json({ success: false, message: 'Token is expired' });
//         }

//         return res.status(401).json({ success: false, message: 'Invalid token' });
//     }
// };

export const authenticate= async(req,res,next)=>{
    // get token from headers
    const authToken = req.headers.authorization

    // check token exist or not
    if (!authToken || !authToken.startsWith('Bearer')) {
        return res.status(401).json({success:false,message:'No token, authorization denied '})
    }

    try {

        const token = authToken.split(' ')[1];

        // verify token 
        // const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY)
        const decoded= jwt.verify(token,"MPo2Ru9GTfUMMuJvPq76U/d2KHUyCsXu/3JH/dmmmT3j+hDIRkIVIurkiCjAF94VLC9PfZbCj2KlAIA4zBKcQ8wW/4xlNINePpHMrc+AUGe3TpiePIxU8V9P25eyVmYFvyO2B4cyVHE3rLhB/f/pyLvTtlQljq0xu4Y51MuYIoSFzEw8fyub+woKcB4QEn/mwvFXQ/F7JUMkirN9mMWkwgCvCyKxvmpJx18coudFA1fL+u2YDXCpB0J7TmwjIMLDeiFCbJhsHf9niBPenD+ofJTIUquqeweQwnZUeObjTljRIP/RymNC+G47GCX9mSjNTvdJKlJnw1TqqT2mzejzmA==")
        
        console.log(decoded);

        req.userID = decoded.id
        req.role = decoded.role
        
        console.log(authToken);
        next(); //must call 

    } catch (err) {
        if(err.name==='TokenExpiredError'){
            return res.status(401).json({success:false,message:'Token is expired '})
        }

        return res.status(401).json({success:false, message:err.message})
    }
};


// export const restrict =async(req,res,next)=>{
//     const userId =req.userId

//     let user;

//     const patient = await User.findById(userId)
//     const doctor =await Doctor.findById(userId)

//     if (patient) {
//         user = patient
//     }
//     if (doctor) {
//         user = doctor
//     }

//     if(!roles.includes(user.role)){
//         return res.status(401).json({success:false, message:"you're not authorized "})
//     }

//     next();
// };

export const restrict = (req, res, next) => {
    const userId = req.userID;

    let user;

    User.findById(userId)
        .then(foundUser => {
            user = foundUser;
            return Doctor.findById(userId);
        })
        .then(foundDoctor => {
            user = foundDoctor || user;

            if (!user) {
                return res.status(401).json({ success: false, message: "User not found" });
            }

            // Assuming you have defined roles array somewhere
            if (!roles.includes(user.role)) {
                return res.status(401).json({ success: false, message: "You're not authorized" });
            }

            next();
        })
        .catch(error => {
            console.error("Error in restrict middleware:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        });
};






