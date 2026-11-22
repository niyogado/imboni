"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
const express_validator_1 = require("express-validator");
function validateRequest(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const details = errors.array().map((err) => ({
            field: err.type === 'field' ? err.path : 'unknown',
            message: err.msg,
        }));
        const apiError = new Error('Validation failed');
        apiError.statusCode = 422;
        apiError.code = 'VALIDATION_ERROR';
        apiError.details = details;
        return next(apiError);
    }
    next();
}
//# sourceMappingURL=validation.js.map