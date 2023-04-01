import { Router } from 'express';
import tokenValidate from '../middlewares/token.middleware';
import MatchController from '../controllers/Match.controller';

const MatchRoute = Router();

MatchRoute.route('/').get(MatchController.getAll);
MatchRoute.route('/').post(tokenValidate, MatchController.createMatch);
MatchRoute.route('/:id/finish').patch(tokenValidate, MatchController.finishMatch);
MatchRoute.route('/:id').patch(tokenValidate, MatchController.updateMatch);

export default MatchRoute;
