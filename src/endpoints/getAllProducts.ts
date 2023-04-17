import { Request, Response } from "express";
import { db } from "../database/knex";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await db
      .select("id", "name", "price", "description", "image_url as imageUrl")
      .from("products");

    if (result.length === 0) {
      res.status(404);
      throw new Error("Nenhum produto cadastrado");
    }

    res.status(200).send(result);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inseperado");
    }
  }
};
