import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

export default class TeamController {
  static async getAll(_req: Request, res: Response) {
    const response = await TeamService.getAll();
    res.status(200).json(response);
  }

  static async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await TeamService.getTeamById(+id);
    res.status(200).json(response);
  }
}
