import express from "express";
import { getRegister, logoutUser } from "../controller/authController.js";
import { getLogin } from "../controller/authController.js";


const router = express.Router();    

router.post('/register', getRegister)
router.post('/login', getLogin)
router.post('/logout', logoutUser)

export default router