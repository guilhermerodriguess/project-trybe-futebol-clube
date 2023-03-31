import { Router } from 'express';
import UserController from '../controllers/User.controller';

const userRoute = Router();

userRoute.route('/').post(UserController.login);
userRoute.route('/role').get(UserController.validateToken);

export default userRoute;
