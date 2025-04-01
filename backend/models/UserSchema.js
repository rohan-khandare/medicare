import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin","doctor"],
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("User", UserSchema);








// // UserSchema.js
// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   name: { type: String, required: true },
//   phone: { type: Number },
//   photo: { type: String },
//   role: {
//     type: String,
//     enum: ["patient", "admin", "doctor"], // Add "doctor" to the enum if applicable
//     default: "patient", // Set a default role (adjust if needed)
//   },
//   gender: { type: String, enum: ["male", "female", "other"] },
//   bloodType: { type: String },
//   appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
// });

// export default mongoose.model("User", UserSchema);
