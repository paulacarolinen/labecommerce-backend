import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct } from "../type";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;

    if (!id.length) {
      res.status(400);
      throw new Error("'id' não deve estar vazio");
    }

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser do tipo string");
    }

    const [productIdExist] = await db("products").where({ id: id });

    if (productIdExist) {
      res.status(409);
      throw new Error("'id' já cadastrado, digite outro valor");
    }

    if (!name.length) {
      res.status(400);
      throw new Error("'name' não deve estar vazio");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser do tipo string");
    }

    if (typeof price !== "number") {
      res.status(400);
      throw new Error("'price' deve ser do tipo number");
    }

    if (price < 0) {
      res.status(400);
      throw new Error("'price' deve ser maior ou igual a zero");
    }

    if (typeof description !== "string") {
      res.status(400);
      throw new Error("'description' deve ser do tipo string");
    }

    if (typeof imageUrl !== "string") {
      res.status(400);
      throw new Error("'imageUrl' deve ser do tipo string");
    }

    const newProduct: TProduct = {
      id,
      name,
      price,
      description: description,
      image_url: imageUrl,
    };

    await db("products").insert(newProduct);

    res.status(201).send({ message: "Produto cadastrado com sucesso" });
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
