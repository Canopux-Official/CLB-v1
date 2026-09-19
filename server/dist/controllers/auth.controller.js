"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignIn = void 0;
const google_auth_library_1 = require("google-auth-library");
const User_1 = __importDefault(require("../models/User"));
const jwt_util_1 = require("../utils/jwt.util");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const googleSignIn = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            res.status(400).json({ message: 'Google token is required' });
            return;
        }
        // Verify Google Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            res.status(400).json({ message: 'Invalid Google token' });
            return;
        }
        const { sub: googleId, email, given_name, family_name, picture } = payload;
        // Check if user exists
        let user = await User_1.default.findOne({ googleId });
        if (!user) {
            // Create new user
            user = await User_1.default.create({
                googleId,
                email,
                firstName: given_name,
                lastName: family_name,
                profilePicture: picture,
            });
        }
        if (user.status === 'BANNED') {
            res.status(403).json({ message: 'User is banned' });
            return;
        }
        // Generate JWT
        const jwtToken = (0, jwt_util_1.generateToken)(user._id, user.role);
        res.status(200).json({
            message: 'Authentication successful',
            token: jwtToken,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePicture: user.profilePicture,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error('Error in googleSignIn:', error);
        res.status(500).json({ message: 'Server error during authentication' });
    }
};
exports.googleSignIn = googleSignIn;
