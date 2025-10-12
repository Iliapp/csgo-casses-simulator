import {Request, Response, Router} from "express";
import {config} from '../config.js';
import Controller
import DatabaseService from "../ services/database.service.js";
// import login
// import JwtService from '../utils/jwt.js'


class UsersController implements Controller {
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
    }


}

