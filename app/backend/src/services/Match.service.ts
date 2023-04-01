import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { ICreateMatch, IUpdateMatch } from '../interfaces/Match';
import HTTPError from '../helpers/HTTPError';

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
    const { awayTeamGoals, homeTeamGoals, homeTeamId, awayTeamId } = body;

    if (homeTeamId === awayTeamId) {
      throw new HTTPError(422, 'It is not possible to create a match with two equal teams');
    }

    const validateHomeTeam = await Team.findByPk(homeTeamId);
    const validateAwayTeam = await Team.findByPk(awayTeamId);

    if (!validateAwayTeam || !validateHomeTeam) {
      throw new HTTPError(404, 'There is no team with such id!');
    }

    const response = await Match
      .create({ awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId, inProgress: true,
      });
    return response;
  }
}
