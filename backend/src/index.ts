// @ts-ignore server start
import App from './app';
import 'dotenv/config';
import express from "express";
import DatabaseService from "./ services/database.service.js"


// const app = express();
// const PORT = 3001;


const app: App = new App([
    new DatabaseService()
]);





