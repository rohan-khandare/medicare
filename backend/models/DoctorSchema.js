import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: {
    type: String,
  },

  // Fields for doctors only
  specialization: { type: String },
  qualifications: {
    type: Array,
  },

  experiences: {
    type: Array,
  },

  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Doctor", DoctorSchema);






// // DoctorSchema.js
// import mongoose from "mongoose";

// const DoctorSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   name: { type: String, required: true },
//   phone: { type: Number },
//   photo: { type: String },
//   ticketPrice: { type: Number },
//   role: {
//     type: String,
//     enum: ["patient", "admin", "doctor"], // Add "doctor" to the enum
//     default: "patient", // Set a default role (adjust if needed)
//   },
//   specialization: { type: String },
//   qualifications: { type: Array },
//   experiences: { type: Array },
//   bio: { type: String }, // Remove maxLength restriction if not necessary
//   about: { type: String },
//   timeSlots: { type: Array },
//   reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
//   averageRating: { type: Number, default: 0 },
//   totalRating: { type: Number, default: 0 },
//   isApproved: {
//     type: String,
//     enum: ["pending", "approved", "cancelled"],
//     default: "pending",
//   },
//   appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
// });

// export default mongoose.model("Doctor", DoctorSchema);
