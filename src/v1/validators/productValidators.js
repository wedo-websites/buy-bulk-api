const { body, param, validationResult } = require("express-validator");
const { errorResponse } = require("../utils/responseUtils");

const validateProduct = [
    body("name").trim().notEmpty().withMessage("Product name is required"),
    body("name").trim().isLength({ min: 1, max: 250 }).withMessage("Product name must be maximum 250 characters only"),
    body("selling_price").trim().notEmpty().withMessage("Selling Price is required"),
    body("selling_price").isFloat({ min: 0 }).withMessage("Selling price must be a positive number"),
    body("market_price").trim().notEmpty().withMessage("Market price is required"),
    body("market_price").isFloat({ min: 0 }).withMessage("Market price must be a positive number"),
    body("stock").trim().notEmpty().withMessage("Product name is required"),
    // body("image").optional().isBase64().withMessage("Image must be a base64 encoded string"),
    handleValidationResult
];

const validateProductId = [
    param("id").notEmpty().withMessage("Product ID is required").isLength({ max: 36 }).withMessage("Product ID cannot exceed 36 characters"),
    handleValidationResult
];

function handleValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array()[0].msg, STATUS_CODES.BAD_REQUEST);
    }
    next();
}

module.exports = {
    validateProduct,
    validateProductId
};