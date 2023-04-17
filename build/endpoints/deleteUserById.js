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
exports.deleteUserById = void 0;
const knex_1 = require("../database/knex");
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToDelete = req.params.id;
        const [userIdExist] = yield (0, knex_1.db)("users").where({ id: idToDelete });
        if (!userIdExist) {
            res.status(404);
            throw new Error("'id' não cadastrado");
        }
        const [userInPurchases] = yield (0, knex_1.db)("purchases").where({
            buyer: idToDelete,
        });
        if (userInPurchases) {
            yield (0, knex_1.db)("purchases_products")
                .del()
                .where({ purchase_id: userInPurchases.id });
            yield (0, knex_1.db)("purchases").del().where({ buyer: idToDelete });
        }
        yield (0, knex_1.db)("users").del().where({ id: idToDelete });
        res.status(200).send({ message: "Usuário apagado com sucesso" });
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
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=deleteUserById.js.map