import { Sequelize } from "sequelize";

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT, DATABASE_URL } =
  process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  // port: PGPORT,
  // host: PGHOST,
  dialect: "postgres",
   protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
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
