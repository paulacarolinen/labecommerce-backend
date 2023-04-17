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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const knex_1 = require("../database/knex");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, price, description, imageUrl } = req.body;
        if (!id.length) {
            res.status(400);
            throw new Error("'id' não deve estar vazio");
        }
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser do tipo string");
        }
        const [productIdExist] = yield (0, knex_1.db)("products").where({ id: id });
        if (productIdExist) {
            res.status(409);
            throw new Error("'id' já cadastrado, digite outro valor");
        }
        if (!name.length) {
            res.status(400);
            throw new Error("'name' não deve estar vazio");
        }
        if (typeof name !== "string") {
            res.status(400);
            throw new Error("'name' deve ser do tipo string");
        }
        if (typeof price !== "number") {
            res.status(400);
            throw new Error("'price' deve ser do tipo number");
        }
        if (price < 0) {
            res.status(400);
            throw new Error("'price' deve ser maior ou igual a zero");
        }
        if (typeof description !== "string") {
            res.status(400);
            throw new Error("'description' deve ser do tipo string");
        }
        if (typeof imageUrl !== "string") {
            res.status(400);
            throw new Error("'imageUrl' deve ser do tipo string");
        }
        const newProduct = {
            id,
            name,
            price,
            description: description,
            image_url: imageUrl,
        };
        yield (0, knex_1.db)("products").insert(newProduct);
        res.status(201).send({ message: "Produto cadastrado com sucesso" });
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
exports.createProduct = createProduct;
//# sourceMappingURL=createProduct.js.map