import { Request, Response } from "express";
import { db } from "../database/knex";

export const getAllPurchases = async (req: Request, res: Response) => {
  try {
    const result = await db
      .select(
        "id",
        "buyer as buyerId",
        "total_price as totalPrice",
        "created_at as createdAt",
        "paid"
      )
      .from("purchases");

    if (result.length === 0) {
      res.status(404);
      throw new Error("Nenhum pedido cadastrado");
    }

    res.status(200).send(result);
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
