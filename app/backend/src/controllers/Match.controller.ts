import { Request, Response } from 'express';
import MatchService from '../services/Match.service';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    const progress = req.query.inProgress;
    const boolProgress = progress === 'true';
    if (progress) {
      const result = await MatchService.getMatchesByProgress(boolProgress);
      return res.status(200).json(result);
    }

    const result = await MatchService.getAll();
    return res.status(200).json(result);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await MatchService.finishMatch(+id);
    res.status(200).json({ message: 'Finished' });
  }
}
