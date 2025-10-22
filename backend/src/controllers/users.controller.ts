import {Request, response, Response, Router} from "express";
import {config} from '../config.js';
import DatabaseService from "../ services/database.service.js";



class UsersController implements controller {
    public path = '/api/user';
    public router = Router();
    private dbService: DatabaseService = new DatabaseService();
    // private password: string
    // private jwt service


    constructor() {
        this.dbService = new DatabaseService();
        // this.pasword = new password
        // this.jwtservice
        // this.router.use()
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get(`${this.path}/get_all_users`, adminMiddleware, this.get_all_users.bind(this));
        // this.router.get(`${this.path}/isAdmin`, adminMiddleware, this.isAdmin.bind(this));
        //
        // this.router.post(`${this.path}/auth`, this.authenticate.bind(this));
        // this.router.post(`${this.path}/register`, this.register.bind(this));
        //
        // this.router.patch(`${this.path}/change_password`, jwtMiddleware, this.changePassword.bind(this));
        //
        // this.router.delete(`${this.path}/delete_user`, adminMiddleware, this.delete_user.bind(this));
        // }


        // private async authenticate(request: Request, response: Response) {
        //     conts { login, password } = request.body;
        // }
        //
        // if(!login, password) {
        //      return response.status(400).json({ error: "Login and password are required." });
        //
        // try {
        //     await this.dbService.connect();
        //     const user = await this.dbService.getUserByLogin(login);
        //
        //     if(!user) {
        // return response.status(404).json({ error: "User not found." });
        // }
        // const passwordMatch = await this.passwordService.comparePassword(password, user.password);
        //
        //     if(!passwordMatch) {
        //         return response.status(401).json({ error: "nvalid credentials." });
        //     }
        //
        // response.status(200).json({ token: this.jwtService.generateToken(login) });
        //
        // } catch (eror){
        // response.status(500).json({ error: "Error during authentication." });
        //     }
        // }


    }
}

