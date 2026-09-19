"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onboardProvider = void 0;
const User_1 = __importStar(require("../models/User"));
const ServiceProvider_1 = __importDefault(require("../models/ServiceProvider"));
const onboardProvider = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'User not found in request' });
            return;
        }
        const { phone, whatsappNumber, serviceCategories, businessName, bio, experienceYears, location, address, availability, baseFare, documents } = req.body;
        // 1. Update the base User document
        await User_1.default.findByIdAndUpdate(req.user._id, {
            $set: {
                phone,
                whatsappNumber,
                role: User_1.UserRole.PROVIDER // Upgrade role
            }
        });
        // 2. Create or Update the ServiceProvider document
        let provider = await ServiceProvider_1.default.findOne({ user: req.user._id });
        if (provider) {
            // Update existing
            provider = await ServiceProvider_1.default.findOneAndUpdate({ user: req.user._id }, {
                $set: {
                    serviceCategories,
                    businessName,
                    bio,
                    experienceYears,
                    location,
                    address,
                    availability,
                    baseFare,
                    documents
                }
            }, { new: true, runValidators: true });
        }
        else {
            // Create new
            provider = await ServiceProvider_1.default.create({
                user: req.user._id,
                serviceCategories,
                businessName,
                bio,
                experienceYears,
                location,
                address,
                availability,
                baseFare,
                documents,
                isVerified: false // Needs manual verification later
            });
        }
        res.status(200).json({
            message: 'Provider onboarded successfully',
            provider
        });
    }
    catch (error) {
        console.error('Error in onboardProvider:', error);
        res.status(500).json({ message: 'Server error during provider onboarding' });
    }
};
exports.onboardProvider = onboardProvider;
