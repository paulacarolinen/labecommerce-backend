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
exports.searchProductsByName = void 0;
const knex_1 = require("../database/knex");
const searchProductsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q.length < 1) {
            res.status(400);
            throw new Error("Insira pelo menos um caractere");
        }
        const list = yield knex_1.db
            .select("id", "name", "price", "description", "image_url as imageUrl")
            .from("products")
            .where("name", "LIKE", `%${q}%`);
        if (list.length === 0) {
            res.status(404);
            throw new Error("Nome de produto não encontrado");
        }
        const result = {
            quantity: list.length,
            list,
        };
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
exports.searchProductsByName = searchProductsByName;
//# sourceMappingURL=searchProductsByName.js.map