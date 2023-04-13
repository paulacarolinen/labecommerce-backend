"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const type_1 = require("./type");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
(0, database_1.createUser)("u01", "usuario@email.com", "xxxx");
(0, database_1.createProduct)("p004", "Monitor HD", 800, type_1.PRODUCT_CATEGORY.ELECTRONICS);
(0, database_1.getAllProducts)();
(0, database_1.getProductById)("p004");
(0, database_1.queryProductsByName)("monitor");
(0, database_1.createPurchase)("u003", "p004", 2, 1600);
(0, database_1.getAllPurchasesFromUserId)("u003");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/users", (req, res) => {
    res.send((0, database_1.getAllUsers)());
});
//# sourceMappingURL=index.js.map