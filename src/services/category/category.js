import express from "express";
import s from "sequelize";
import db from "../../db/modules/connect.js";

const { User, Category } = db;

const categories = express.Router();

categories
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Category.findAll();
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Category.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  });
categories
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Category.findByPk(req.params.id);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  })
  .put(async (req, res, next) => {
    const data = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(data[1][0]);
  })
  .delete(async (req, res, next) => {
    const data = await Category.destroy({ where: { id: req.params.id } });
    if (data > 0) {
      res.send("Ok!");
    } else {
      res.status(404).send("Not found");
    }
  });
export default categories;
