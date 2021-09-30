import sequelize from "../start.js";
import s from "sequelize";

const { DataTypes } = s;

const Review = sequelize.define(
  "review",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);
export default Review;
