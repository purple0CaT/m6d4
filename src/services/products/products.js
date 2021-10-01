import express from "express";
import s from "sequelize";
import db from "../../db/modules/connect.js";
const { Op } = s;
const { Product, Review, User, Category, ProductCateg } = db;
//=
const products = express.Router();
//=
products
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({
        include: [
          { model: Category, through: { attributes: [] } },
          { model: Review, include: User },
        ],
        order: [["id", "ASC"]],
        offset: req.query.page ? (req.query.page - 1) * 5 : 0,
        limit: 5,
        where: req.query.search
          ? {
              category: { [Op.iLike]: `%${req.query.search}%` },
            }
          : {},
      });

      const pages = await Product.count();
      const response = [data, { pages: pages }];
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      // In this line youre inserting your category id and post id to the many-to-many table
      const categData = await ProductCateg.create({
        categoryId: req.body.categoryId,
        productId: data.dataValues.id,
      });
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
        include: [
          { model: Category, through: { attributes: [] } },
          { model: Review, include: User },
        ],
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
