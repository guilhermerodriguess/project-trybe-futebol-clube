import ITeam from '../interfaces/Team';
import Team from '../database/models/Team';

export default class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const response = await Team.findAll({ raw: true });
    return response;
  }

  static async getTeamById(id: number) {
    const response = await Team.findByPk(id);
    return response;
  }
}
