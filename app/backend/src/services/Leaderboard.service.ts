import { Request } from 'express';
import TeamService from './Team.service';
import { ILeadeboard, IMatchIndProg } from '../interfaces/Leaderboard';
import MatchService from './Match.service';

class LeaderboardController {
  private static async calculatePoints(match: IMatchIndProg) {
    const hGoals = match.homeTeamGoals;
    const aGoals = match.awayTeamGoals;
    if (hGoals > aGoals) {
      return { homeTeam: 3, awayTeam: 0, winner: 'homeTeam' };
    } if (aGoals > hGoals) {
      return { homeTeam: 0, awayTeam: 3, winner: 'awayTeam' };
    }
    return { homeTeam: 1, awayTeam: 1, winner: 'draw' };
  }

  private static async getPoints(id: number, type: string) {
    const query = type === 'home' ? 'homeTeam' : 'awayTeam';
    const other = type !== 'home' ? 'homeTeam' : 'awayTeam';
    const matches: IMatchIndProg[] = await MatchService.getByTeamId(id, type ? query : undefined);
    const points = await Promise.all(matches.map(this.calculatePoints));
    const totalPoints = points.reduce((acc, item) => acc + item[query], 0);
    const totalGames = points.length;
    const goalsFavor = matches.reduce((acc, item) => acc + item[`${query}Goals`], 0);
    const goalsOwn = matches.reduce((acc, item) => acc + item[`${other}Goals`], 0);
    const efficiency = +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return { totalPoints,
      totalGames,
      totalVictories: points.filter((item) => item.winner === query).length,
      totalDraws: points.filter((item) => item.winner === 'draw').length,
      totalLosses: points.filter((item) => item.winner === other).length,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency };
  }

  private static async getMetrics(id: number, matches: IMatchIndProg[]) {
    const points = await Promise.all(matches.map(LeaderboardController.calculatePoints));
    const totalPoints = points.reduce((acc, item, index) => {
      const type = matches[index].homeTeamId === id ? 'homeTeam' : 'awayTeam';
      return acc + item[type];
    }, 0);
    const totalLosses = points.filter((item, index) => {
      const type = matches[index].homeTeamId !== id ? 'homeTeam' : 'awayTeam';
      return item.winner === type;
    }).length;
    const totalDraws = points.filter((item) => item.winner === 'draw').length;
    const totalVictories = points.filter((item, index) => {
      const type = matches[index].homeTeamId === id ? 'homeTeam' : 'awayTeam';
      return item.winner === type;
    }).length;
    return { totalDraws, totalLosses, totalPoints, totalVictories };
  }

  private static getGoals(id: number, matches: IMatchIndProg[]) {
    const goalsFavor = matches.reduce((acc, item, index) => {
      const type = matches[index].homeTeamId === id ? 'homeTeam' : 'awayTeam';
      return acc + item[`${type}Goals`];
    }, 0);
    const goalsOwn = matches.reduce((acc, item, index) => {
      const type = matches[index].homeTeamId !== id ? 'homeTeam' : 'awayTeam';
      return acc + item[`${type}Goals`];
    }, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsBalance, goalsFavor, goalsOwn };
  }

  private static async getPointsGeneral(id: number) {
    const matches: IMatchIndProg[] = await MatchService.getByTeam(id);
    const totalGames = matches.length;
    const points = await this.getMetrics(id, matches);
    const goals = this.getGoals(id, matches);
    const efficiency = +((points.totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return { totalGames, ...points, ...goals, efficiency };
  }

  private static sortArr(arr: ILeadeboard[]) {
    return arr.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);
  }

  static async getTeams(req: Request) {
    const { type } = req.params;
    const allTeams = await TeamService.getAll();
    const ids = allTeams.map((team) => team.id);
    const data: ILeadeboard[] = await Promise.all(ids.map(async (id) => {
      const info = await LeaderboardController.getPoints(id, type);
      const name = await TeamService.getTeamById(id).then((resp) => resp.teamName);
      return { name, ...info };
    }));
    const result = LeaderboardController.sortArr(data);
    return result;
  }

  static async getTeamsGeneral() {
    const allTeams = await TeamService.getAll();
    const ids = allTeams.map((team) => team.id);
    const data = await Promise.all(ids.map(async (id) => {
      const info = await LeaderboardController.getPointsGeneral(id);
      const name = await TeamService.getTeamById(id).then((resp) => resp.teamName);
      return { name, ...info };
    }));
    const result = LeaderboardController.sortArr(data);
    return result;
  }
}

export default LeaderboardController;
