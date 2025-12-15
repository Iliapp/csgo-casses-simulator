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

    // @ts-ignore
    async updateUserPassword(request: Request, response: Response): Promise<Response> {
        try{
            const email = request.params.email;
            const {oldPassword, newPassword} = request.body;
            await this.userService.updateUserPassword(email, oldPassword, newPassword);
            return response.status(200).json({message: 'User password updated successfully.'});


        } catch (error:any) {
            return response.status(400).json({error: error.message});
        }

    }

}

