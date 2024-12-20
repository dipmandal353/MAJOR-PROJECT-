import { getUser, login, logout, register } from "../controllers/userController.js";
import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";

//create a router object
const router = express.Router()

router.post("/register",  register)
router.post("/login", login)
router.get("/logout",  logout)
router.get("/getuser", isAuthenticated, getUser)

export default router
