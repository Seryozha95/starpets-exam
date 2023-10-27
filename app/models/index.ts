import fs from "fs";
import path from "path";
import { Sequelize, Options } from "sequelize";
import * as configData from "../../config/config.json";
import User from "./user.model";

enum ConfigTypes {
  Development = "development",
  Test = "test",
  Production = "production",
}

type DB = {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: unknown | any;
};

const basename = path.basename(__filename);
const env = (process.env.NODE_ENV as ConfigTypes) || ConfigTypes.Development;
const config = configData[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config as Options
);

const db: DB = { sequelize, Sequelize };

const modelFiles = fs.readdirSync(__dirname);

modelFiles
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".ts" &&
      file.indexOf(".test.ts") === -1
    );
  })
  .forEach(async (file) => {
    const model = await import(path.join(__dirname, file));
    model.default(sequelize);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.user = User(sequelize);

export default db;
