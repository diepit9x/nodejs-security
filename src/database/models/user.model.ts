import { DataTypes, Model, Sequelize } from 'sequelize';

export class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: 'user' | 'admin';
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    }
  );
};
