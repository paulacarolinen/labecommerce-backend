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
exports.getAllPurchases = void 0;
const knex_1 = require("../database/knex");
const getAllPurchases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db
            .select("id", "buyer as buyerId", "total_price as totalPrice", "created_at as createdAt", "paid")
            .from("purchases");
        if (result.length === 0) {
            res.status(404);
            throw new Error("Nenhum pedido cadastrado");
        }
        res.status(200).send(result);
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
exports.getAllPurchases = getAllPurchases;
//# sourceMappingURL=getAllPurchases.js.map