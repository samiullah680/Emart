const Router = require("express");
const OrderModel = require("../Models/OrdersModels/OrderModels");
const ProductModel = require("../Models/ProductModels/AllProductModel");

const OrderControllerCreateOrder = async (req, res) => {
  try {
    const {
      productDetails,
      shippingDetails,
      paymentType,
    } = req.body;
    productDetails.forEach(async (e) => {
      const OrderInformation = {
        productDetails: e,
        shippingDetails: shippingDetails,
        customerDetails: req.user,
        orderStatus: paymentType == "online" ? "Shiping" : "pending",
        paymentType: paymentType,
        paymentStatus: paymentType == "online" ? "done" : "offline Payment",
        discountPrice: e.discountPrice || 0,
        basePrice: e.price,
        totlePrice: (e.price - e.discountPrice || 0) * e.quantity,
      };
      await OrderModel.create(OrderInformation);
    })
    res.status(200).json({
      success: true,
      status: 200,
      message: " Order Successfull completed",
    });
    productDetails.forEach(async (e) => {
      const findByIdProduct = await ProductModel.findById(e._id)
      findByIdProduct.quantity = findByIdProduct.quantity - e.quantity > 0 ? (findByIdProduct.quantity - e.quantity) : 0
      const updatedProduct = {
        title: findByIdProduct.title,
        Additional_Image: findByIdProduct.Additional_Image,
        brand: findByIdProduct.brand,
        category: findByIdProduct.category,
        description: findByIdProduct.description,
        price: findByIdProduct.price,
        quantity: findByIdProduct.quantity,
        rating: findByIdProduct.rating,
      }
      await ProductModel.findByIdAndUpdate(e._id, updatedProduct);
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

const OrderControllerEditOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById({
      _id: req.body.id,
    });
    order.orderStatus =
      req.body.orderStatus === undefined
        ? order.orderStatus
        : req.body.orderStatus;
    order.paymentStatus =
      req.body.paymentStatus === undefined
        ? order.paymentStatus
        : req.body.paymentStatus;
    order.paymentType =
      req.body.paymentType === undefined
        ? order.paymentType
        : req.body.paymentType;
    let EditedOrder = await OrderModel.findByIdAndUpdate(req.body.id, order, {
      new: true,
    });
    if (EditedOrder) {
      res.status(200).json({
        status: 200,
        success: true,
        data: EditedOrder,
        message: "order update Successfull",
      });
    } else {
      res.status(400).json({
        success: false,
        status: 400,
        message: "No order found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      success: false,
      message: err.message,
    });
  }
};

const OrderControllerDeleteOrder = async (req, res) => {
  try {
    let deleteOrder = await OrderModel.findByIdAndRemove(req.query.id);
    if (deleteOrder) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "order  deleted successfully",
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

const OrderControllerGetOrder = async (req, res) => {
  let count = req.query.count;
  let activePage = req.query.activePage - 1;
  try {
    const filter = {
      _id: req.query.orderId,
      "customerDetails.id": req.query.customerId,
      "productDetails.user_id": req.query.adminId,
      "productDetails.title": req.query.title,
      "customerDetails.useName": req.query.customerUserName,
    };
    const filterQuery = Object.entries(filter).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (req.query.search != undefined && req.query.search != "") {
      filterQuery.$or = [
        { _id: { "$regex": req.query.search, "$options": "i" } },
        { "productDetails.title": { "$regex": req.query.search, "$options": "i" } },
      ];
    }
    let TotleCount = await OrderModel.count(filterQuery);
    const getOrder = await OrderModel.find(filterQuery)
      .limit(count)
      .skip(count * activePage);
    res.status(200).json({
      success: true,
      status: 200,
      data: getOrder,
      TotleCount: TotleCount,
      message: "order  Get Product Successfull",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

const OrderControllerGetSingleOrder = async (req, res) => {
  try {
    // let post = await EmpData.findByIdAndRemove(req.query.id);
    let singleProduct = await OrderModel.findOne({
      _id: req.body.id,
    });
    if (singleProduct) {
      res.status(200).json({
        success: true,
        status: 200,
        data: singleProduct,
        message: "Single order get successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        status: 400,
        message: "No order found",
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
  OrderControllerCreateOrder,
  OrderControllerEditOrder,
  OrderControllerDeleteOrder,
  OrderControllerGetOrder,
  OrderControllerGetSingleOrder,
};
