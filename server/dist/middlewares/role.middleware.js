"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ message: `Role ${req.user.role} is not authorized to access this route` });
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
