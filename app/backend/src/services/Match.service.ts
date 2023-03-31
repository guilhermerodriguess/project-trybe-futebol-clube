import Match from '../database/models/Match';
import Team from '../database/models/Team';

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
}
