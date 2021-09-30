import { Sequelize } from "sequelize";

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  port: PGPORT,
  host: PGHOST,
  dialect: "postgres",
});

const testDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB on rails!");
  } catch (err) {
    console.log(err);
  }
};
export const connctDb = async () => {
  try {
    await sequelize.sync();
    console.log("🚀 DB connected!");
  } catch (err) {}
};
export default sequelize;
