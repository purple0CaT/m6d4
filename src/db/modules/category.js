import sequelize from "../start.js";
import s from "sequelize";
const { DataTypes } = s;

const Category = sequelize.define(
  "category",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    text: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

export default Category;
