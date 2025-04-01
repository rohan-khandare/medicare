
import express from "express";
import { checkout, paymentVerification,saveBooking } from "../Controllers/paymentController.js";

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

router.post("/book-appointment", saveBooking);

export default router
