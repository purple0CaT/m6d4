import express from "express";
import s from "sequelize";
import db from "../../db/modules/connect.js";
const { Op } = s;
const { Product, Review } = db;
//=
const products = express.Router();
//=
products
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({
        include: Review,
        order: [["price", "ASC"]],
        where: req.query.search
          ? {
              [Op.or]: [
                { name: { [Op.iLike]: `%${req.query.search}%` } },
                { category: { [Op.iLike]: `%${req.query.search}%` } },
              ],
            }
          : {},
      });
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  });
products
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({
        include: Review,
        where: { id: req.params.id },
      });
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Product.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.send(data[1][0]);
    } catch (error) {
      console.log(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const data = await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log(data);
      if (data > 0) {
        res.send("Ok!");
      } else {
        res.status(404).send("Not found!");
      }
    } catch (error) {
      console.log(error);
    }
  });
export default products;
