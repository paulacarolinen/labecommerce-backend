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
exports.getUserPurchasesByUserId = void 0;
const knex_1 = require("../database/knex");
const getUserPurchasesByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [userExist] = yield (0, knex_1.db)("users").where({ id: id });
        if (!userExist) {
            res.status(404);
            throw new Error("'id' não cadastrado");
        }
        const userPurchases = yield knex_1.db
            .select("id as purchaseId", "total_price as totalPrice", "created_at as createdAt", "paid")
            .from("purchases")
            .where({ buyer: id });
        if (userPurchases.length === 0) {
            res.status(404);
            throw new Error("O usuário não realizou nenhuma compra");
        }
        res.status(200).send(userPurchases);
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
exports.getUserPurchasesByUserId = getUserPurchasesByUserId;
//# sourceMappingURL=getUserPurchasesByUserId.js.map