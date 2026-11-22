"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
// Public: register
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email required'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('First name required'),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage('Last name required'),
    (0, express_validator_1.body)('roleName').notEmpty().withMessage('Role required'),
], validation_1.validateRequest, (req, res, next) => auth_controller_1.authController.register(req, res, next));
// Public: login
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password required'),
], validation_1.validateRequest, (req, res, next) => auth_controller_1.authController.login(req, res, next));
// Protected: get profile
router.get('/me', auth_1.authenticate, (req, res, next) => auth_controller_1.authController.getProfile(req, res, next));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map