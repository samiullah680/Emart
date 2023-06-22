const Router = require("express").Router();
const {
  AddToCardController,
  EditAddToCardController,
  DeleteAddToCardController,
  GetAddToCardController,
} = require("../Controllers/AddToCardController");
const Auth = require("../Middlewares/AuthMiddleware");
Router.route("/addToCard").post(Auth, AddToCardController);
Router.route("/editAddToCard").post(Auth, EditAddToCardController);
Router.route("/deleteAddToCard").post(Auth, DeleteAddToCardController);
Router.route("/getAddToCard").get(Auth, GetAddToCardController);
module.exports = Router;
