const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../Models/AuthModels/AuthModel");

const AuthControllerLogin = asyncHandler(async (req, res) => {
  const { credential, password } = req.body;
  console.log("credentials:", credential, password);
  const user = await Auth.findOne({
    $or: [{ email: credential }, { username: credential }],
  });
  if (!user) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "User does not exists !",
    });
  }


  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Incorrect password !",
    });
  }
  // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      userType: user.userType,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      number: user.number,
    },
    "tokenKey",
    { expiresIn: "3d" }
  );
  res.status(200).json({
    user_id: user._id,
    username: user.username,
    email: user.email,
    token,
    success: true,
  });
});

const AuthControllerRegistration = async (req, res) => {
  const { firstname, lastname, username, userType, email, password, number } =
    req.body;
  const found = await Auth.findOne({
    $or: [{ email }, { username }, { number }],
  });

  if (found && found.length !== 0) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "User already exists !",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await Auth.create({
    firstname,
    lastname,
    userType,
    username,
    number,
    email,
    password: hashedPassword.toString(),
  });

  if (!user) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Something went wrong ! Please try again !",
    });
  }

  res
    .status(200)
    .json({ message: "User register successfully !", success: true });
};

const AuthControllerForgetPassword = async (req, res) => {
  try {
    res.status(200).json({
      success: false,
      status: 200,
      message: "Password Forget link send to email",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

module.exports = {
  AuthControllerLogin,
  AuthControllerRegistration,
  AuthControllerForgetPassword,
};
