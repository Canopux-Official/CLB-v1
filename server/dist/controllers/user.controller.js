"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onboardCustomer = void 0;
const User_1 = __importDefault(require("../models/User"));
const onboardCustomer = async (req, res) => {
    try {
        const { phone, whatsappNumber, location, address } = req.body;
        if (!req.user) {
            res.status(401).json({ message: 'User not found in request' });
            return;
        }
        const updatedUser = await User_1.default.findByIdAndUpdate(req.user._id, {
            $set: {
                phone,
                whatsappNumber,
                location,
                address
            }
        }, { new: true, runValidators: true }).select('-__v');
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({
            message: 'User onboarded successfully',
            user: updatedUser
        });
    }
    catch (error) {
        console.error('Error in onboardCustomer:', error);
        res.status(500).json({ message: 'Server error during onboarding' });
    }
};
exports.onboardCustomer = onboardCustomer;
