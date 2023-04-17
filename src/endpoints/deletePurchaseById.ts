import { Request, Response } from "express";
import { db } from "../database/knex";

export const deletePurchaseById = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [purchaseIdExist] = await db("purchases").where({ id: idToDelete });

    if (!purchaseIdExist) {
      res.status(404);
      throw new Error("'id' não cadastrado");
    }

    await db("purchases_products").del().where({ purchase_id: idToDelete });
    await db("purchases").del().where({ id: idToDelete });

    res.status(200).send({ message: "Pedido cancelado com sucesso" });
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
