const Router = require('express').Router();
const { AuthControllerLogin, AuthControllerRegistration, AuthControllerForgetPassword } = require("../Controllers/AuthController")

Router.route('/login').post(AuthControllerLogin);
Router.route('/register').post(AuthControllerRegistration);
Router.route('/forgetPassword').post(AuthControllerForgetPassword);



module.exports = Router