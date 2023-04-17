import { Request, Response } from "express";
import { db } from "../database/knex";
import { TUser } from "../type";

export const editUserById = async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const [userToEdid] = await db("users").where({ id: idToEdit });

    if (!userToEdid) {
      res.status(404);
      throw new Error("'id' não cadastrado");
    }

    const newName = req.body.name as string | undefined;
    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    if (newName !== undefined && typeof newName !== "string") {
      res.status(400);
      throw new Error("'name'deve ser do tipo string");
    }

    if (newEmail !== undefined) {
      if (typeof newEmail !== "string") {
        res.status(400);
        throw new Error("'email' deve ser do tipo string");
      }

      const [userEmailExist] = await db("users").where({ email: newEmail });

      if (userEmailExist) {
        res.status(409);
        throw new Error("'email' já cadastrado, digite outro valor");
      }
    }

    if (newPassword !== undefined && typeof newPassword !== "string") {
      res.status(400);
      throw new Error("'password' deve ser do tipo string");
    }

    const updateUser: TUser = {
      id: userToEdid.id,
      name: newName || userToEdid.name,
      email: newEmail || userToEdid.email,
      password: newPassword || userToEdid.password,
    };

    await db("users").update(updateUser).where({ id: idToEdit });

    res.status(200).send({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(200);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};
