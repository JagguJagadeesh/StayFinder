import { Router } from "express";
import { signup , signin, logout} from "../controllers/authController.js";

const authRoute = Router();

authRoute.post('/auth/signup',signup);
authRoute.post('/auth/signin',signin);
authRoute.post('/auth/logout',logout);


export {authRoute}