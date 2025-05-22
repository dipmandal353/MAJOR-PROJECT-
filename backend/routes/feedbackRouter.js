import express from "express"
import sendFeedback from "../controllers/feedback.js"

const router = express.Router()

router.post("/sendfeedback", sendFeedback)

export default router