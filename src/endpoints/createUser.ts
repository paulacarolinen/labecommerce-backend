import { Request, Response } from "express";
import { db } from "../database/knex";
import { TUser } from "../type";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    if (!id.length) {
      res.status(400);
      throw new Error("'id' não deve estar vazio");
    }

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser do tipo string");
    }

    const [userIdExist] = await db("users").where({ id: id });

    if (userIdExist) {
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

    if (!email.length) {
      res.status(400);
      throw new Error("'email' não deve estar vazio");
    }

    if (typeof email !== "string") {
      res.status(400);
      throw new Error("'email' deve ser do tipo string");
    }

    const [userEmailExist] = await db("users").where({ email: email });

    if (userEmailExist) {
      res.status(409);
      throw new Error("'email' já cadastrado, digite outro valor");
    }

    if (!password.length) {
      res.status(400);
      throw new Error("'password' não deve estar vazio");
    }

    if (typeof password !== "string") {
      res.status(400);
      throw new Error("'password' deve ser do tipo string");
    }

    const newUser: TUser = {
      id,
      name,
      email,
      password,
    };

    await db("users").insert(newUser);

    res.status(201).send({ message: "Usuário cadastrado com sucesso" });
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
