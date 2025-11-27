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

}