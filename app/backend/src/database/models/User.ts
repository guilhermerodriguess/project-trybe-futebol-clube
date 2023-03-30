import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class user extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

user.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
});

export default user;
