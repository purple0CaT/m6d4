import express from "express";
import createHttpError from "http-errors";
import multer from "multer";
import s from "sequelize";
import db from "../../db/modules/connect.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const { Op } = s;
const { Product, Review, User, Category, ProductCateg } = db;
//=
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary, //authomatic read cloud URL
  params: {
    folder: "amazonTest-Img",
  },
});
//=
const products = express.Router();
//=
products
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({
        include: [
          {
            model: Category,
            through: { attributes: [] },
            where: req.query.search ? { id: `${req.query.search}` } : {},
          },
          { model: Review, include: User },
        ],
        order: [["id", "ASC"]],
        offset: req.query.page ? (req.query.page - 1) * 5 : 0,
        limit: 5,
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
products.post(
  "/:id/uploadPhoto",
  multer({
    storage: cloudinaryStorage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype != "image/jpeg" && file.mimetype != "image/png")
        cb(createHttpError(400, "Format not suported!"), false);
      else cb(null, true);
    },
  }).single("image"),
  async (req, res, next) => {
    try {
      let urlPhoto = req.file.path;
      const data = await Product.update(
        { image: urlPhoto },
        {
          where: {
            id: req.params.id,
          },
          returning: true,
        }
      );
      res.status(201).send(data[1][0]);
    } catch (error) {
      next(error);
    }
  }
);
export default products;
