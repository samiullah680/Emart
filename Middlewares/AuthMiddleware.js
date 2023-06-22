const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const auth = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // const data = jwt.verify(token, process.env.JWT_SECRET);
            const data = jwt.verify(token, "tokenKey");
            req.user = data;
            next();
        } catch (error) {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Not Authorized !",
            });

        }
    }
    if (!token) {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Not Authorized ! No Token found !",
        });
    }
})

module.exports = auth;