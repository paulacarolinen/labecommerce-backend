import express from "express";
import cors from "cors";
import { createUser } from "./endpoints/createUser";
import { getAllUsers } from "./endpoints/getAllUsers";
import { editUserById } from "./endpoints/editUserById";
import { deleteUserById } from "./endpoints/deleteUserById";
import { createProduct } from "./endpoints/createProduct";
import { getAllProducts } from "./endpoints/getAllProducts";
import { searchProductsByName } from "./endpoints/searchProductsByName";
import { getProductById } from "./endpoints/getProductById";
import { editProductById } from "./endpoints/editProductById";
import { deleteProductById } from "./endpoints/deleteProductById";
import { createPurchase } from "./endpoints/createPurchase";
import { getAllPurchases } from "./endpoints/getAllPurchases";
import { getUserPurchasesByUserId } from "./endpoints/getUserPurchasesByUserId";
import { getPurchaseById } from "./endpoints/getPurchaseById";
import { deletePurchaseById } from "./endpoints/deletePurchaseById";

const app = express();
app.use(express.json());

app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.post("/users", createUser);

app.get("/users", getAllUsers);

app.put("/users/:id", editUserById);

app.delete("/users/:id", deleteUserById);

app.post("/products", createProduct);

app.get("/products", getAllProducts);

app.get("/products/search", searchProductsByName);

app.get("/products/:id", getProductById);

app.put("/products/:id", editProductById);

app.delete("/products/:id", deleteProductById);

app.post("/purchases", createPurchase);

app.get("/purchases", getAllPurchases);

app.get("/users/:id/purchases", getUserPurchasesByUserId);

app.get("/purchases/:id", getPurchaseById);

app.delete("/purchases/:id", deletePurchaseById);