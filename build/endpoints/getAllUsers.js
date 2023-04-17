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
exports.getAllUsers = void 0;
const knex_1 = require("../database/knex");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield knex_1.db
            .select("id", "name", "email", "created_at")
            .from("users");
        if (!users.length) {
            res.statusCode = 404;
            throw new Error("Não há usuários cadastrados");
        }
        res.status(200).send(users);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.statusCode = 500;
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=getAllUsers.js.map