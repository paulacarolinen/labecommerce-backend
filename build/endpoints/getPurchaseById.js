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
exports.getPurchaseById = void 0;
const knex_1 = require("../database/knex");
const getPurchaseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [purchaseExist] = yield (0, knex_1.db)("purchases").where({ id: id });
        if (!purchaseExist) {
            res.status(404);
            throw new Error("'id' não cadastrado");
        }
        const [result] = yield knex_1.db
            .select("purchases.id as purchaseId", "purchases.buyer as buyerId", "name as buyerName", "email as buyerEmail", "purchases.total_price as totalPrice", "purchases.created_at as createdAt", "purchases.paid as paid")
            .from("purchases")
            .where({ "purchases.id": id })
            .innerJoin("users", "purchases.buyer", "=", "users.id");
        const productsList = yield knex_1.db
            .select("id", "name", "price", "description", "image_url as imageUrl", "quantity")
            .from("purchases_products")
            .where({ purchase_id: id })
            .innerJoin("products", "purchases_products.product_id", "products.id");
        res.status(200).send(Object.assign(Object.assign({}, result), { products: productsList }));
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
exports.getPurchaseById = getPurchaseById;
//# sourceMappingURL=getPurchaseById.js.map