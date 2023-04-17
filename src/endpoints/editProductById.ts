import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct } from "../type";

export const editProductById = async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const [productToEdid] = await db("products").where({ id: idToEdit });

    if (!productToEdid) {
      res.status(404);
      throw new Error("'id' não cadastrado");
    }

    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.name as string | undefined;
    const newImageUrl = req.body.name as string | undefined;

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

    const updateProduct: TProduct = {
      id: productToEdid.id,
      name: newName || productToEdid.name,
      price: newPrice ? productToEdid.price : newPrice,
      description: newDescription || productToEdid.description,
      image_url: newImageUrl || productToEdid.image_url,
    };

    await db("products").update(updateProduct).where({ id: idToEdit });

    res.status(200).send({ message: "Produto atualizado com sucesso" });
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