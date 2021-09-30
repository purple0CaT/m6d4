import sequelize from "../start.js";
import s from "sequelize";
const { DataTypes } = s;

const ProductCateg = sequelize.define(
  "productcateg",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  { timestamps: false }
);

export default ProductCateg;
