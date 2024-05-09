"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const authRoutes_1 = __importDefault(require("./routers/authRoutes"));
const port = process.env.PORT || 4000;
const app = (0, express_1.default)();
(0, dbConfig_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use('/api/v1/auth', authRoutes_1.default);
app.listen(port, () => {
    console.log(`server runninon port ${port}`);
});
