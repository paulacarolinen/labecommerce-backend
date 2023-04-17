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
exports.createPurchase = void 0;
const knex_1 = require("../database/knex");
const createPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, buyer, products } = req.body;
        if (!id.length) {
            res.status(400);
            throw new Error("'id' não deve estar vazio");
        }
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser do tipo string");
        }
        const [purchaseIdExist] = yield (0, knex_1.db)("purchases").where({ id: id });
        if (purchaseIdExist) {
            res.status(400);
            throw new Error("'id' já cadastrado, digite outro valor");
        }
        if (!buyer.length) {
            res.status(400);
            throw new Error("'buyer' não deve estar vazio");
        }
        if (typeof buyer !== "string") {
            res.status(400);
            throw new Error("'buyer' deve ser do tipo string");
        }
        const [buyerExist] = yield (0, knex_1.db)("users").where({ id: buyer });
        if (!buyerExist) {
            res.status(404);
            throw new Error("Usuário não cadastrado");
        }
        if (products.length === 0) {
            res.status(400);
            throw new Error("'products' deve conter pelo menos um produto para que o pedido seja realizado");
        }
        for (let i in products) {
            if (typeof products[i].productId !== "string") {
                res.status(400);
                throw new Error(`'productId' no indice ${i} do array products deve ser string`);
            }
        }
        for (let i in products) {
            const [productIdExist] = yield (0, knex_1.db)("products").where({
                id: products[i].productId,
            });
            if (!productIdExist) {
                res.status(404);
                throw new Error(`'productId' no indice ${i} do array products não está cadastrado`);
            }
        }
        for (let i in products) {
            if (typeof products[i].quantity !== "number") {
                res.status(400);
                throw new Error(`'quantity' no indice ${i} do array products deve ser number`);
            }
        }
        for (let i in products) {
            if (products[i].quantity <= 0) {
                res.status(400);
                throw new Error(`'quantity' no indice ${i} do array products deve ser maior que zero`);
            }
        }
        let totalPrice = 0;
        for (let product of products) {
            const [productPrice] = yield knex_1.db
                .select("price")
                .from("products")
                .where({ id: product.productId });
            totalPrice += productPrice.price * product.quantity;
        }
        const newPurchase = {
            id,
            buyer,
            total_price: totalPrice,
        };
        yield (0, knex_1.db)("purchases").insert(newPurchase);
        for (let product of products) {
            const [purchasesProductExist] = yield (0, knex_1.db)("purchases_products")
                .where({ purchase_id: id })
                .andWhere({ product_id: product.productId });
            if (purchasesProductExist) {
                yield (0, knex_1.db)("purchases_products")
                    .update({
                    quantity: purchasesProductExist.quantity + product.quantity,
                })
                    .where({ purchase_id: id })
                    .andWhere({ product_id: product.productId });
            }
            else {
                const newPurchaseProduct = {
                    purchase_id: id,
                    product_id: product.productId,
                    quantity: product.quantity,
                };
                yield (0, knex_1.db)("purchases_products").insert(newPurchaseProduct);
            }
        }
        res.status(201).send({ message: "Pedido realizado com sucesso" });
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
exports.createPurchase = createPurchase;
//# sourceMappingURL=createPurchase.js.map