import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { ICreateMatch, IUpdateMatch } from '../interfaces/Match';

export default class MatchService {
  static async getAll() {
    const result = await Match.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return result;
  }

  static async getMatchesByProgress(progress: boolean) {
    const result = await Match.findAll({
      where: { inProgress: progress },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return result;
  }

  static async finishMatch(id: number) {
    const response = await Match.update({ inProgress: false }, { where: { id } });
    return response;
  }

  static async updateMatch(id: number, req: IUpdateMatch) {
    const response = await Match.update(req, { where: { id } });
    return response;
  }

  static async createMatch(body: ICreateMatch) {
    const {
      awayTeamGoals,
      homeTeamGoals,
      homeTeamId,
      awayTeamId,
    } = body;
    const response = await Match.create({
      awayTeamGoals,
      awayTeamId,
      homeTeamGoals,
      homeTeamId,
      inProgress: true,
    });
    return response;
  }
}
