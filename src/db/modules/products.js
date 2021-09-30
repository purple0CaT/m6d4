import sequelize from "../start.js";
import s from "sequelize";
const { DataTypes } = s;

const Product = sequelize.define("product", {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue:
      "https://www.odoo.com/web/image/res.users/1293172/image_1024?unique=7070055",
  },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

export default Product;
