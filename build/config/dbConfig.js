"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function dbConnect() {
    mongoose_1.default.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`).then(() => {
        console.log('DB connected successfully');
    }).catch(err => {
        console.log("Error while connecting DB\n", err);
    });
}
exports.default = dbConnect;
