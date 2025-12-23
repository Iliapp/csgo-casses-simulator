import {Router} from "express";
import {UserController} from "../controllers/users.controller.js";
import { Request, Response } from 'express';

const router = Router();
const userController = new UserController(userService);


router.get("/users", (req: Request, res: Response) => userController.getAllUsers(req, res));
router.get("/users/:email", (req: Request, res: Response)=> userController.getUserByEmail(req,res))



