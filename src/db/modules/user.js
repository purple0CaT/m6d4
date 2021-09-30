import sequelize from "../start.js";
import s from "sequelize";

const { DataTypes } = s;

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

export default User;
