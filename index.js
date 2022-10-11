import express from "express";
import { router } from "./router.js";
import * as dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import path from "path"


dotenv.config();
const PORT = 5000;
const app = express();
const __dirname=path.resolve()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname));

app.use(router)


 app.listen(PORT, () => { console.log(`Server start in ${PORT}`) })
