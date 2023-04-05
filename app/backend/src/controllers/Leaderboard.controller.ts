import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  static async getHomeTeamsLeaderboard(req: Request, res: Response) {
    const result = await LeaderboardService.getTeams(req);
    return res.status(200).json(result);
  }

  static async getAllTeamsLeaderboard(req: Request, res: Response) {
    const result = await LeaderboardService.getTeamsGeneral();
    return res.status(200).json(result);
  }
}
