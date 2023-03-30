import { Router } from 'express';
import UserController from '../controllers/User.controller';

const userRoute = Router();

userRoute.route('/').post(UserController.login);

export default userRoute;
