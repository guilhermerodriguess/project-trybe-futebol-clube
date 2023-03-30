import { Model, INTEGER, BOOLEAN } from 'sequelize';
import team from './Team';
import db from '.';

class match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
});

team.hasMany(match, { foreignKey: 'homeTeam', as: 'teamHome' });
team.hasMany(match, { foreignKey: 'awayTeam', as: 'teamAway' });

match.belongsTo(team, { foreignKey: 'homeTeam', as: 'teamHome' });
match.belongsTo(team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default match;
