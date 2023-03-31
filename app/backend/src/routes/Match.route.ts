import { Router } from 'express';
import MatchController from '../controllers/Match.controller';

const MatchRoute = Router();

MatchRoute.route('/').get(MatchController.getAll);

export default MatchRoute;
