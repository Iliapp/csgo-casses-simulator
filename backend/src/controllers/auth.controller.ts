import {Request,Response} from "express";
// import {UserModel} from "../models/user.model.js";
import AuthService from "../ services/auth.service.js";

const authService = new AuthService();

export class AuthController {
// register
    async signUp(request: Request, response: Response) {
        try {
            const {email, password, name} = request.body;
            const result = await authService.signUp(email, password, name);
            response.status(201).json(result);
        } catch (error: any) {
            response.status(400).json({ message: error.message });
        }
    }

    // log in
    async singIn(request: Request, response: Response) {
        try {
            const {email, password} = request.body;
            const result = await authService.signIn(email, password);
            response.status(200).json(result);
        } catch (error: any) {
            response.status(401).json({ message: error.message });
        }
    }

    // check token
    async verifyToken(request: Request, response: Response) {
        try {
            const token = request.headers.authorization?.split(" ")[1] || "";
            const user = await authService.verifyToken(token);
            response.status(200).json(user);
        } catch (error: any) {
            response.status(401).json({ message: error.message });
        }
    }






}






