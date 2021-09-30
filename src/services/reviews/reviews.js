import express from "express";
import s from "sequelize";
import db from "../../db/modules/connect.js";

const { Product, Review } = db;

const reviews = express.Router();

reviews
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Review.findAll();
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Review.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  });
reviews
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Review.findByPk(req.params.id);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  })
  .put(async (req, res, next) => {
    const data = await Review.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(data[1][0]);
  })
  .delete(async (req, res, next) => {
    const data = await Review.destroy({ where: { id: req.params.id } });
    if (data > 0) {
      res.send("Ok!");
    } else {
      res.status(404).send("Not found");
    }
  });
export default reviews;
