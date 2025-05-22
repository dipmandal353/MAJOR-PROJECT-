import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { updateUserProfile, getUserProfile } from "../controllers/userProfileController.js";
import { upload } from "../middlewares/multer.js"; // This now works as expected

const router = express.Router();

router.get("/me", isAuthenticated, getUserProfile);

router.put(
  "/update-profile",
  isAuthenticated,
  upload.fields([
    { name: "profilepic", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateUserProfile
);


export default router;
