import { Request, Response } from "express";
import { db } from "../database/knex";

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [userIdExist] = await db("users").where({ id: idToDelete });

    if (!userIdExist) {
      res.status(404);
      throw new Error("'id' não cadastrado");
    }

    const [userInPurchases] = await db("purchases").where({
      buyer: idToDelete,
    });

    if (userInPurchases) {
      await db("purchases_products")
        .del()
        .where({ purchase_id: userInPurchases.id });
      await db("purchases").del().where({ buyer: idToDelete });
    }

    await db("users").del().where({ id: idToDelete });

    res.status(200).send({ message: "Usuário apagado com sucesso" });
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
