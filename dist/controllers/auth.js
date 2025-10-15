"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.signUp = exports.signin = void 0;
const zod_1 = __importDefault(require("zod"));
const user_1 = require("../services/user");
const auth_1 = require("../services/auth");
const signinSchema = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.email(),
    password: zod_1.default.string(),
});
const signin = async (req, res, next) => {
    try {
        const data = signinSchema.parse(req.body);
        const newUser = await (0, user_1.createNewUser)(data);
        const token = (0, auth_1.createToken)(newUser);
        res.status(201).json({
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
            token,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.signin = signin;
const signUpSchema = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string(),
});
const signUp = async (req, res, next) => {
    try {
        const data = signUpSchema.parse(req.body);
        const user = await (0, user_1.verifyUser)(data);
        const token = (0, auth_1.createToken)(user);
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.signUp = signUp;
const validate = async (req, res) => {
    const user = await (0, user_1.getUserById)(req.user?.id);
    res.json({ id: user?.id, email: user?.email, name: user?.name });
};
exports.validate = validate;
