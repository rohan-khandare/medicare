
import express  from "express";
import { 
    updateUser,
    deleteUser,
    getAllUser,
    getSingleUser,
    getUserProfile,
    getMyAppointments
} from "../Controllers/userController.js";


import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// router.get("/:id", authenticate, restrict(["patient"]),getSingleUser);
// router.get("/", authenticate, restrict(["admin"]), getAllUser);
// router.put("/:id",authenticate, restrict(["patient"]),updateUser);
// router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);

router.get("/:id",getSingleUser);
router.get("/",getAllUser);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);
router.get("/profile/:id",getUserProfile);
router.get("/appointments/:id",getMyAppointments);


export default router;

// import express from "express";
// import { updateUser, deleteUser, getAllUser, getSingleUser } from "../Controllers/userController.js";
// import { authenticate, restrict } from "../auth/verifyToken.js";

// const router = express.Router();

// // router.get("/:id", authenticate, restrict(["patient"]), async (req, res, next) => {
// //     try {
// //         await getSingleUser(req, res);
// //     } catch (error) {
// //         next(error);
// //     }
// // });

// router.get("/:id", async (req, res, next) => {
//     try {
//         await authenticate(req, res, async () => {
//             await restrict(["patient"])(req, res, async () => {
//                 await getSingleUser(req, res);
//             });
//         });
//     } catch (error) {
//         next(error);
//     }
// });

// router.get("/", authenticate, restrict(["admin"]), async (req, res, next) => {
//     try {
//         await getAllUser(req, res);
//     } catch (error) {
//         next(error);
//     }
// });

// router.put("/:id", authenticate, restrict(["patient"]), async (req, res, next) => {
//     try {
//         await updateUser(req, res);
//     } catch (error) {
//         next(error);
//     }
// });

// router.delete("/:id", authenticate, restrict(["patient"]), async (req, res, next) => {
//     try {
//         await deleteUser(req, res);
//     } catch (error) {
//         next(error);
//     }
// });

// export default router;

