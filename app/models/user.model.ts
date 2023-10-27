import { Model, Sequelize, DataTypes } from 'sequelize';

interface UserAttributes {
  balance: number;
}

export default (sequelize: Sequelize) => {
  class User extends Model<UserAttributes> {
    balance!: string;
  }

  User.init(
    {
      balance: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    }
  );

  return User;
};