import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const LeaderboardRoute = Router();

LeaderboardRoute.route('/').get(LeaderboardController.getAllTeamsLeaderboard);
LeaderboardRoute.route('/:type').get(LeaderboardController.getHomeTeamsLeaderboard);

export default LeaderboardRoute;
