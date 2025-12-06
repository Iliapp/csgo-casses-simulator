import {UserService} from "../ services/user.service.js";
import { Request, Response } from "express";



export class UserController {
    private userService: UserService;
    constructor(userService : UserService) {
        this.userService = userService
    }

    // @ts-ignore
    async getAllUsers(request: Request, response: Response): Promise<Response> {
        try {
            const res = await this.userService.getAllUsers();
            response.json(res);

        } catch (error:any) {
            response.status(400).json({error: error.message});
        }

    }

    // @ts-ignore
    async getUserByEmail(request: Request, response: Response): Promise<Response> {
        try {
            const email = request.params.email;
            const user = await this.userService.getUserByEmail(email);
            response.json(user);
        } catch (error:any) {
            response.status(400).json({error: error.message});
        }
    }

    // @ts-ignore
    async createUser(request: Request, response: Response): Promise<Response> {
        try{
            const { email, password, display_name,role,balance } = request.body;
            await this.userService.createUser(email, password, display_name, role, balance);
            return response.json({message: 'User created successfully.'});
        } catch (error:any) {
            response.status(400).json({error: error.message});
        }
    }

}

