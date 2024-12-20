import express from "express"
import {uploadQuestions, getQuestions} from "../controllers/questionController.js"
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post('/upload-questions', isAuthenticated, isAuthorized("admin") , uploadQuestions);
// router.post('/upload-questions' ,isAuthenticated,  uploadQuestions);

router.get('/get-questions', getQuestions)

export default router

