import ITeam from '../interfaces/Team';
import Team from '../database/models/Team';
import HTTPError from '../helpers/HTTPError';

export default class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const response = await Team.findAll({ raw: true });
    return response;
  }

  static async getTeamById(id: number) {
    const response = await Team.findByPk(id);
    if (!response) throw new HTTPError(404, 'Team not found');
    return response;
  }
}
