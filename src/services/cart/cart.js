import express from "express";
import s from "sequelize";
import db from "../../db/modules/connect.js";

const { User, Product, Cart } = db;

const carts = express.Router();

carts.route("/").get(async (req, res, next) => {
  try {
    const data = await Cart.findAll({ where: { userId: req.params.userId } });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

carts.post("/:prodId", async (req, res, next) => {
  try {
    const data = await Cart.create({
      ...req.body,
      productId: req.params.prodId,
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
carts
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Cart.findAll({
        where: { userId: req.params.id },
        include: [Product, User],
        attributes: [
          "productId",
          [s.fn("count", s.col("cart.id")), "prod_qty"],
        ],
        group: ["product.id", "user.id", "cart.productId"],
      });
      // .then((cart) => {
      //   return cart.map(
      //     (c) =>
      //       (c.dataValues.prod_sum =
      //         c.dataValues.prod_sum * c.dataValues.product.price)
      //   );
      // console.log(cart[1].dataValues.product.price);
      // return cart.prod_qty * cart.products.price;
      // });
      // let totalPrice = await Cart.findAndCountAll({
      //   include: { model: Product },
      //   where: { userId: req.params.id },
      // });
      // console.log(data);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  })
  .put(async (req, res, next) => {
    const data = await Cart.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(data[1][0]);
  })
  .delete(async (req, res, next) => {
    const data = await Cart.destroy({ where: { id: req.params.id } });
    if (data > 0) {
      res.send("Ok!");
    } else {
      res.status(404).send("Not found");
    }
  });
export default carts;
