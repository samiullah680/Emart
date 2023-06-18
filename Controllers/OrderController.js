const Router = require("express");
const OrderModel = require("../Models/OrdersModels/OrderModels");
const ProductModel = require("../Models/ProductModels/AllProductModel");
const OrderControllerCreateOrder = async (req, res) => {
  try {
    const {
      productDetails,
      shippingDetails,
      paymentType,
      discountPrice,
      basePrice,
      totlePrice,
    } = req.body;
    // OrderProductDetails = await ProductModel.find({
    //   _id: ["648e1d5cf43bba5d098e5a4e", "648e1d7bf43bba5d098e5a50"],
    // });
    // OrderProductDetails = await ProductModel.find({
    //   _id: SelectedProductId,
    // });
    // const OrderInformation = {
    //   productDetails: OrderProductDetails,
    //   customerDetails: req.user,
    //   shippingDetails: {
    //     address: "bakuchiya",
    //     city: "champaran",
    //     country: "india",
    //     zipCode: 8454522,
    //     firstName: "sami",
    //     lastName: "alam",
    //     number: 7372890117,
    //   },
    //   orderStatus: "done",
    //   paymentType: "online",
    //   paymentStatus: "done",
    //   discountPrice: 30,
    //   basePrice: 100234,
    //   totlePrice: 1230,
    // };

    const OrderInformation = {
      productDetails: productDetails,
      shippingDetails: shippingDetails,
      customerDetails: req.user,
      orderStatus: paymentType == "online" ? "done" : "pending",
      paymentType: paymentType,
      paymentStatus: paymentType == "online" ? "done" : "offline Payment",
      discountPrice: discountPrice,
      basePrice: basePrice,
      totlePrice: totlePrice,
    };
    let OrderCreate = await OrderModel.create(OrderInformation); 
    res.status(200).json({
      status: 200,
      data: OrderCreate,
      message: " Order Successfull  Created",
    });
  } catch (err) {
    res.status(400).json({
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
        data: EditedOrder,
        message: "order update Successfull",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No order found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

const OrderControllerDeleteOrder = async (req, res) => {
  try {
    let deleteOrder = await OrderModel.findByIdAndRemove(req.query.id);
    if (deleteOrder) {
      res.status(200).json({
        status: 200,
        message: "order  deleted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No post found",
      });
    }
  } catch (err) {
    res.status(400).json({
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
        { _id: req.query.search },
        { "productDetails.title": req.query.search },
      ];
    }
    let TotleCount = await OrderModel.count(filterQuery);
    const getOrder = await OrderModel.find(filterQuery)
      .limit(count)
      .skip(count * activePage);
    res.status(200).json({
      status: 200,
      data: getOrder,
      TotleCount: TotleCount,
      message: "order  Get Product Successfull",
    });
  } catch (err) {
    res.status(400).json({
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
        status: 200,
        data: singleProduct,
        message: "Single order get successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No order found",
      });
    }
  } catch (err) {
    res.status(400).json({
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
