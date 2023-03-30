import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class team extends Model {
  id!: number;
  teamName!: string;
}

team.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default team;
