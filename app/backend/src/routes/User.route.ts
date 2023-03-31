import { Router } from 'express';
import UserController from '../controllers/User.controller';

const UserRoute = Router();

UserRoute.route('/').post(UserController.login);
UserRoute.route('/role').get(UserController.validateToken);

export default UserRoute;
