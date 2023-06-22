const Router = require("express").Router();
const Auth = require("../Middlewares/AuthMiddleware");

const {
  ProductControllerCreateProduct,
  ProductControllerEditProduct,
  ProductControllerDeleteProduct,
  ProductControllerGetSingleProduct,
  ProductControllerGetProduct,
} = require("../Controllers/ProductController");
Router.route("/createProduct").post(Auth, ProductControllerCreateProduct);
Router.route("/editProduct").post(Auth, ProductControllerEditProduct);
Router.route("/deleteProduct").post(Auth, ProductControllerDeleteProduct);
Router.route("/getSingleProduct").post(Auth, ProductControllerGetSingleProduct);
Router.route("/getProduct").get(Auth, ProductControllerGetProduct);
module.exports = Router;
