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

    async createUser(request: Request, response: Response): Promise<Response> {}

}


// soon must

// to add smth