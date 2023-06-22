const Router = require("express");
const ProdctModel = require("../Models/ProductModels/AllProductModel");
const ProductControllerCreateProduct = async (req, res) => {
  try {
    let post = await ProdctModel.create({ ...req.body, user_id: req.user.id });
    res.status(200).json({
      success: true,
      status: 200,
      data: post,
      message: "Product Created",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};
const ProductControllerEditProduct = async (req, res) => {
  const editData = {
    title: req.body.title,
    Additional_Image: req.body.Additional_Image,
    brand: req.body.brand,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    rating: req.body.rating,
    discountPrice: req.body.discountPrice
  };
  try {
    let post = await ProdctModel.findByIdAndUpdate(req.body.id, editData, {
      new: true,
    });
    if (post) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Product Edit Successfull",
      });
    } else {
      res.status(400).json({
        success: false,
        status: 400,
        message: "No product found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

const ProductControllerDeleteProduct = async (req, res) => {
  try {
    let deleteProduct = await ProdctModel.findByIdAndRemove(req.body.id);
    if (deleteProduct) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Product  deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        status: 400,
        message: "No post found",
      });

    }
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

const ProductControllerGetProduct = async (req, res) => {
  let count = req.body.count;
  let activePage = req.body.activePage - 1;
  try {
    const filter = {
      user_id: req.user.id,
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      brand: req.body.brand,
      quantity: req.body.quantity,
    };
    const filterQuery = Object.entries(filter).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
    if (req.body.search != undefined && req.body.search != "") {
      filterQuery.$or = [
        { title: { "$regex": req.body.search, "$options": "i" } },
        { brand: { "$regex": req.body.search, "$options": "i" } },
      ];
    }
    let TotleCount = await ProdctModel.count(filterQuery);
    const product = await ProdctModel.find(filterQuery)
      .limit(count)
      .skip(count * activePage);
    res.status(200).json({
      success: true,
      status: 200,
      data: product,
      TotleCount,
      message: "Product  Get Product Success Full",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

const ProductControllerGetSingleProduct = async (req, res) => {
  try {
    let singleProduct = await ProdctModel.findOne({
      _id: req.query.id,
    });
    if (singleProduct) {
      res.status(200).json({
        success: true,
        status: 200,
        data: singleProduct,
        message: "Single Product get successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        status: 400,
        message: "No Product found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

module.exports = {
  ProductControllerCreateProduct,
  ProductControllerEditProduct,
  ProductControllerDeleteProduct,
  ProductControllerGetProduct,
  ProductControllerGetSingleProduct,
};
