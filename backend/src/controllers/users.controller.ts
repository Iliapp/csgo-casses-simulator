import {UserService} from "../ services/user.service.js";
import { Request, Response } from "express";



export class UserController {
    private userService: UserService;
    constructor(userService : UserService) {
        this.userService = userService
    }

}