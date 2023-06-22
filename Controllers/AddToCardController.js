const Router = require("express");
const AddToCardModel = require("../Models/AddToCardModels/AddToCardModel");
const AddToCardController = async (req, res) => {
  try {
    const { productDetails, discountPrice, basePrice, totlePrice } = req.body;

    const AddToCardInformation = {
      productDetails: productDetails,
      customerDetails: req.user,
      discountPrice: discountPrice,
      basePrice: basePrice,
      totlePrice: totlePrice,
    };
    let AddTocard = await AddToCardModel.create(AddToCardInformation);
    res.status(200).json({
      success: true,
      status: 200,
      data: AddTocard,
      message: " Product Added in Card Successfull  ",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

const EditAddToCardController = async (req, res) => {
  try {
    const CardData = await AddToCardModel.findById({
      _id: req.body.id,
    });
    CardData.productDetails[0].quantity =
      req.body.quantity === undefined
        ? CardData.productDetails[0].quantity
        : req.body.quantity;
    CardData.basePrice = CardData.productDetails[0].price * req.body.quantity;
    CardData.totlePrice = CardData.productDetails[0].price * req.body.quantity;
    let UpdatedCardData = await AddToCardModel.findByIdAndUpdate(
      req.body.id,
      CardData,
      {
        new: true,
      }
    );
    if (UpdatedCardData) {
      res.status(200).json({
        success: true,
        status: 200,
        data: UpdatedCardData,
        message: "Quantity update Successfull",
      });
    } else {
      res.status(400).json({
        success: false,
        status: 400,
        message: "No produts Found found",
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

const DeleteAddToCardController = async (req, res) => {
  try {
    let DeleteAddToCard = await AddToCardModel.findByIdAndRemove(req.body.id);
    if (DeleteAddToCard) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Product  deleted successfully",
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

const GetAddToCardController = async (req, res) => {
  try {
    let GetAddToCard = await AddToCardModel.find({
      "customerDetails.id": req.body.customerId,
    });
    if (GetAddToCard) {
      res.status(200).json({
        success: true,
        status: 200,
        data: GetAddToCard,
        message: "Product  Get successfully",
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
  AddToCardController,
  EditAddToCardController,
  DeleteAddToCardController,
  GetAddToCardController,
};
