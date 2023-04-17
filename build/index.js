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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        res.status(500).send({ error: "Erro ao buscar usuários" });
    }
}));
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        res.status(500).send({ error: "Erro ao buscar produtos" });
    }
}));
app.get("/purchases", (req, res) => {
    res.status(200).send(database_1.purchases);
});
app.get("/product/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        if (!query || query.trim().length === 0) {
            return res
                .status(400)
                .send({ error: "O parâmetro de busca deve conter pelo menos um caractere" });
        }
        const result = database_1.products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send({ error: "Erro ao buscar produto" });
    }
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, email, password } = req.body;
        if (!id || !email || !password) {
            return res.status(400).send({ error: "Dados incompletos" });
        }
        const existingUser = database_1.users.find((user) => user.id === id || user.email === email);
        if (existingUser) {
            return res.status(400).send({ error: "Usuário já cadastrado" });
        }
        const newUser = {
            id,
            email,
            password,
        };
        database_1.users.push(newUser);
        res.status(201).send("Cadastro realizado com sucesso");
    }
    catch (error) {
        res.status(500).send({ error: "Erro ao criar usuário" });
    }
}));
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, price, category } = req.body;
        if (!id || !name || !price || !category) {
            return res.status(400).send({ error: "Dados incompletos" });
        }
        const existingProduct = database_1.products.find((product) => product.id === id);
        if (existingProduct) {
            return res.status(400).send({ error: "Produto já cadastrado" });
        }
        const newProduct = {
            id,
            name,
            price,
            category,
        };
        database_1.products.push(newProduct);
        res.status(201).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        res.status(500).send({ error: "Erro ao criar produto" });
    }
}));
app.post("/purchases", (req, res) => {
    try {
        const body = req.body;
        const { userId, productId, quantity, totalPrice } = body;
        if (!userId || !productId || !quantity || !totalPrice) {
            throw new Error("Todos os campos são obrigatórios");
        }
        const userExists = database_1.users.find((user) => user.id === userId);
        if (!userExists) {
            throw new Error("Usuário não encontrado");
        }
        const productExists = database_1.products.find((product) => product.id === productId);
        if (!productExists) {
            throw new Error("Produto não encontrado");
        }
        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice,
        };
        database_1.purchases.push(newPurchase);
        res.status(201).send("Compra realizada com sucesso");
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const product = database_1.products.find((product) => product.id === id);
    if (product) {
        res.status(200).send(product);
    }
    else {
        res.status(404).send("Produto não encontrado");
    }
});
app.get("/users/:id/purchases", (req, res) => {
    const id = req.params.id;
    const user = database_1.users.find((user) => user.id === id);
    if (!user) {
        res.status(404).send("Usuário não encontrado");
        return;
    }
    const userPurchases = database_1.purchases.filter((purchase) => purchase.userId === id);
    res.status(200).send(userPurchases);
});
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const userIndex = database_1.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        res.status(404).send("Usuário não encontrado");
        return;
    }
    database_1.users.splice(userIndex, 1);
    res.status(200).send("Usuário apagado com sucesso");
});
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const productIndex = database_1.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
        res.status(404).send("Produto não encontrado");
        return;
    }
    database_1.products.splice(productIndex, 1);
    res.status(200).send("Produto apagado com sucesso");
});
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const { email, password } = req.body;
    const userIndex = database_1.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        res.status(404).send("Usuário não encontrado");
        return;
    }
    if (!email && !password) {
        res.status(400).send("Por favor, forneça novas informações para atualização do cadastro");
        return;
    }
    const editedUser = Object.assign({}, database_1.users[userIndex]);
    editedUser.email = email !== null && email !== void 0 ? email : editedUser.email;
    editedUser.password = password !== null && password !== void 0 ? password : editedUser.password;
    database_1.users[userIndex] = editedUser;
    res.status(200).send("Cadastro atualizado com sucesso");
});
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const productIndex = database_1.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
        res.status(404).send("Produto não encontrado");
        return;
    }
    const { name, price, category } = req.body;
    if (!name && !price && !category) {
        res.status(400).send("Por favor, forneça novas informações para atualização do produto");
        return;
    }
    const editedProduct = Object.assign({}, database_1.products[productIndex]);
    editedProduct.name = name !== null && name !== void 0 ? name : editedProduct.name;
    editedProduct.price = (price !== undefined && !isNaN(Number(price))) ? Number(price) : editedProduct.price;
    editedProduct.category = category !== null && category !== void 0 ? category : editedProduct.category;
    database_1.products[productIndex] = editedProduct;
    res.status(200).send("Produto atualizado com sucesso");
});
//# sourceMappingURL=index.js.map