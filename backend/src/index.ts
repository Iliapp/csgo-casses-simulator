// @ts-ignore server start
import 'dotenv/config';

import express from "express";
import { AppDataSource } from "./config/db";



const app = express();
const PORT = 3001;

AppDataSource.initialize()
    .then(() => {
        console.log('Database Connected');

        // try {
        //     const users = AppDataSource.manager.query("SELECT * FROM casesf");
        //     console.log(users);
        // }catch(err) {
        //     console.log("Error querying DB",err);
        // }


app.get("/cases", (req, res) => {
    res.json({ status:  "Server is running and DB connected!" });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
    })
    .catch((err) => {
        console.error("Database is not Connected", err);
    })
