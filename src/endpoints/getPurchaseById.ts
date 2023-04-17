import { Request, Response } from "express";
import { db } from "../database/knex";

export const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [purchaseExist] = await db("purchases").where({ id: id });

    if (!purchaseExist) {
      res.status(404);
      throw new Error("'id' não cadastrado");
    }

    const [result] = await db
      .select(
        "purchases.id as purchaseId",
        "purchases.buyer as buyerId",
        "name as buyerName",
        "email as buyerEmail",
        "purchases.total_price as totalPrice",
        "purchases.created_at as createdAt",
        "purchases.paid as paid"
      )
      .from("purchases")
      .where({ "purchases.id": id })
      .innerJoin("users", "purchases.buyer", "=", "users.id");

    const productsList = await db
      .select(
        "id",
        "name",
        "price",
        "description",
        "image_url as imageUrl",
        "quantity"
      )
      .from("purchases_products")
      .where({ purchase_id: id })
      .innerJoin("products", "purchases_products.product_id", "products.id");

    res.status(200).send({ ...result, products: productsList });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};
