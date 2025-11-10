import express = require('express');
import {AuthController} from "../controllers/auth.controller.js";
import { Request, Response } from 'express';


const router = express.Router();
const authController = new AuthController();



router.post("/signUp", authController.signUp.bind(authController));
router.post("/signIn", authController.singIn.bind(authController));
router.get("/verifyToken", authController.verifyToken.bind(authController));
router.post("/resetPassword", authController.resetPassword.bind(authController));


export default router;


