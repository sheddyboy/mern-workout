"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
// interface AuthenticatedRequest extends Request {
//   user: IUser | null;
// }
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify authentication
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            error: "Authorization token required",
        });
    }
    const token = authorization.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        console.log(decoded);
        const { _id } = decoded;
        req.user = yield userModel_1.default.findOne({ _id }).select("_id");
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: "Request is not authorized" });
    }
});
exports.default = requireAuth;
