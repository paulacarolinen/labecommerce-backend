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
exports.createUser = void 0;
const knex_1 = require("../database/knex");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, password } = req.body;
        if (!id.length) {
            res.status(400);
            throw new Error("'id' não deve estar vazio");
        }
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser do tipo string");
        }
        const [userIdExist] = yield (0, knex_1.db)("users").where({ id: id });
        if (userIdExist) {
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
        if (!email.length) {
            res.status(400);
            throw new Error("'email' não deve estar vazio");
        }
        if (typeof email !== "string") {
            res.status(400);
            throw new Error("'email' deve ser do tipo string");
        }
        const [userEmailExist] = yield (0, knex_1.db)("users").where({ email: email });
        if (userEmailExist) {
            res.status(409);
            throw new Error("'email' já cadastrado, digite outro valor");
        }
        if (!password.length) {
            res.status(400);
            throw new Error("'password' não deve estar vazio");
        }
        if (typeof password !== "string") {
            res.status(400);
            throw new Error("'password' deve ser do tipo string");
        }
        const newUser = {
            id,
            name,
            email,
            password,
        };
        yield (0, knex_1.db)("users").insert(newUser);
        res.status(201).send({ message: "Usuário cadastrado com sucesso" });
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
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map