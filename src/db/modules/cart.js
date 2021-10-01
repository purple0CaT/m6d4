import sequelize from "../start.js";
import s from "sequelize";
const { DataTypes } = s;

const Cart = sequelize.define(
  "cart",
  {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  },
  { timestamps: false }
);

export default Cart;
