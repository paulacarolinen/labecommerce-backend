import { Request, Response } from "express";
import { db } from "../database/knex";

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [productExist] = await db("products").where({ id: id });

    if (!productExist) {
      res.status(404);
      throw new Error("'id' não cadastrado");
    }

    const result = {
      id: productExist.id,
      name: productExist.name,
      price: productExist.price,
      description: productExist.description,
      imageUrl: productExist.image_url,
    };

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
