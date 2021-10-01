import sequelize from "../start.js";
import s from "sequelize";

const { DataTypes } = s;

const Review = sequelize.define(
  "review",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false },
    rate: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5,
      },
    },
  },
  { timestamps: false }
);
export default Review;
