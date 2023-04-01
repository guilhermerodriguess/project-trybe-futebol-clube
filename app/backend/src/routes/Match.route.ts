import { Router } from 'express';
import tokenValidate from '../middlewares/token.middleware';
import MatchController from '../controllers/Match.controller';

const MatchRoute = Router();

MatchRoute.route('/').get(MatchController.getAll);
MatchRoute.route('/:id/finish').patch(tokenValidate, MatchController.finishMatch);

export default MatchRoute;
