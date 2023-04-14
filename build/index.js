"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/users", (req, res) => {
    res.status(200).send(database_1.users);
});
app.get("/products", (req, res) => {
    res.status(200).send(database_1.products);
});
app.get("/purchases", (req, res) => {
    res.status(200).send(database_1.purchases);
});
app.get("/product/search", (req, res) => {
    const query = req.query.q;
    const result = database_1.products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
    res.status(200).send(result);
});
app.post("/users", (req, res) => {
    const body = req.body;
    const { id, email, password } = body;
    const newUser = {
        id,
        email,
        password,
    };
    database_1.users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso");
});
app.post("/products", (req, res) => {
    const body = req.body;
    const { id, name, price, category } = body;
    const newProduct = {
        id,
        name,
        price,
        category,
    };
    database_1.products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso");
});
app.post("/purchases", (req, res) => {
    const body = req.body;
    const { userId, productId, quantity, totalPrice } = body;
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice,
    };
    database_1.purchases.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso");
});
//# sourceMappingURL=index.js.map