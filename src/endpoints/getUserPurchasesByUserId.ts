import { Request, Response } from "express";
import { db } from "../database/knex";

export const getUserPurchasesByUserId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [userExist] = await db("users").where({ id: id });

    if (!userExist) {
      res.status(404);
      throw new Error("'id' não cadastrado");
    }

    const userPurchases = await db
      .select(
        "id as purchaseId",
        "total_price as totalPrice",
        "created_at as createdAt",
        "paid"
      )
      .from("purchases")
      .where({ buyer: id });

    if (userPurchases.length === 0) {
      res.status(404);
      throw new Error("O usuário não realizou nenhuma compra");
    }

    res.status(200).send(userPurchases);
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