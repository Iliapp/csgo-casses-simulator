import {Request,Response} from "express";
import {UserModel} from "../models/user.model.js";
import AuthService from "../ services/auth.service.js";

const authService = new AuthService();

export class AuthController {

    async signUp(request: Request, response: Response) {
        try {
            const {email, password, name} = request.body;
            const result = await authService.signUp(email, password, name);
            response.status(201).json(result);
        } catch (error) {
            response.status(400).json(error);
        }
    }




}






