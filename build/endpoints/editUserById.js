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
exports.editUserById = void 0;
const knex_1 = require("../database/knex");
const editUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToEdit = req.params.id;
        const [userToEdid] = yield (0, knex_1.db)("users").where({ id: idToEdit });
        if (!userToEdid) {
            res.status(404);
            throw new Error("'id' não cadastrado");
        }
        const newName = req.body.name;
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        if (newName !== undefined && typeof newName !== "string") {
            res.status(400);
            throw new Error("'name'deve ser do tipo string");
        }
        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                res.status(400);
                throw new Error("'email' deve ser do tipo string");
            }
            const [userEmailExist] = yield (0, knex_1.db)("users").where({ email: newEmail });
            if (userEmailExist) {
                res.status(409);
                throw new Error("'email' já cadastrado, digite outro valor");
            }
        }
        if (newPassword !== undefined && typeof newPassword !== "string") {
            res.status(400);
            throw new Error("'password' deve ser do tipo string");
        }
        const updateUser = {
            id: userToEdid.id,
            name: newName || userToEdid.name,
            email: newEmail || userToEdid.email,
            password: newPassword || userToEdid.password,
        };
        yield (0, knex_1.db)("users").update(updateUser).where({ id: idToEdit });
        res.status(200).send({ message: "Usuário atualizado com sucesso" });
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(200);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
exports.editUserById = editUserById;
//# sourceMappingURL=editUserById.js.map