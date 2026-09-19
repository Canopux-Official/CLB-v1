"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const provider_controller_1 = require("../controllers/provider.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// POST /api/provider/onboard
router.post('/onboard', auth_middleware_1.protect, provider_controller_1.onboardProvider);
exports.default = router;
