"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const User_1 = __importDefault(require("../models/User"));
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = (0, jwt_util_1.verifyToken)(token);
            // Get user from the token
            const user = await User_1.default.findById(decoded.userId).select('-__v');
            if (!user) {
                res.status(401).json({ message: 'Not authorized, user not found' });
                return;
            }
            if (user.status === 'BANNED') {
                res.status(403).json({ message: 'User is banned' });
                return;
            }
            req.user = user;
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
exports.protect = protect;
