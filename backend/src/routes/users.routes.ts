import {Router} from "express";
import {UserController} from "../controllers/users.controller.js";
import { Request, Response } from 'express';

const router = Router();
const userController = new UserController(userService);


router.get("/users", (req: Request, res: Response) => userController.getAllUsers(req, res));
router.get("/users/:email", (req: Request, res: Response)=> userController.getUserByEmail(req,res))
router.post("/users", (req: Request, res: Response) => userController.createUser(req,res))
router.put("/users/:email/password", (req: Request, res: Response) => userController.updateUserPassword(req,res))
router.put("/users/:email/displayName", (req: Request, res: Response) => userController.updateUserDisplayName(req,res))
router.put("/users/:email/balance", (req: Request, res: Response) => userController.updateUserBalance(req,res))
router.put("/users/:email/role", (req: Request, res: Response) => userController.updateUserRole(req,res))

