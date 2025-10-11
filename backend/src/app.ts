import express from "express";
import {config} from "config";
import Controller from "/controllers"
import bodyParser from "body-parser";
import cors from 'cors'


class App {
    private app: express.Application;

    constructor(controller: Controller[]) {
        this.app = express();

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    private initializeMiddlewares(): void{
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    public listen(): void {
        this.app.listen(config.port, () => {
            console.log(`App listen on the port: ${config.port}`);
        });
    }
}

export default App;