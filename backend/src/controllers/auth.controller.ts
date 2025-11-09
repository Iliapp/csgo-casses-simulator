import {Request,Response} from "express";
import {UserModel} from "../models/user.model.js";
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
            response.status(400).json(error.message);
        }
    }

    // log in
    async singIn(request: Request, response: Response) {
        try {
            const {email, password} = request.body;
            const result = await authService.signIn(email, password);
            response.status(200).json(result);
        } catch (error: any) {
            response.status(400).json(error.message);
        }
    }




}






