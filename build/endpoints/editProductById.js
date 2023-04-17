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
exports.editProductById = void 0;
const knex_1 = require("../database/knex");
const editProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToEdit = req.params.id;
        const [productToEdid] = yield (0, knex_1.db)("products").where({ id: idToEdit });
        if (!productToEdid) {
            res.status(404);
            throw new Error("'id' não cadastrado");
        }
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newDescription = req.body.name;
        const newImageUrl = req.body.name;
        if (newName !== undefined && typeof newName !== "string") {
            res.status(400);
            throw new Error("'name'deve ser string");
        }
        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400);
                throw new Error("'price' deve ser number");
            }
            if (newPrice < 0) {
                res.status(400);
                throw new Error("'price' deve ser maior ou igual a zero");
            }
        }
        if (newDescription !== undefined && typeof newDescription !== "string") {
            res.status(400);
            throw new Error("'description' deve ser string");
        }
        if (newImageUrl !== undefined && typeof newImageUrl !== "string") {
            res.status(400);
            throw new Error("'imageUrl' deve ser string");
        }
        const updateProduct = {
            id: productToEdid.id,
            name: newName || productToEdid.name,
            price: newPrice ? productToEdid.price : newPrice,
            description: newDescription || productToEdid.description,
            image_url: newImageUrl || productToEdid.image_url,
        };
        yield (0, knex_1.db)("products").update(updateProduct).where({ id: idToEdit });
        res.status(200).send({ message: "Produto atualizado com sucesso" });
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
exports.editProductById = editProductById;
//# sourceMappingURL=editProductById.js.map