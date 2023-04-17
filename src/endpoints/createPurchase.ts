import { Request, Response } from "express";
import { db } from "../database/knex";
import { TPurchase, TPurchaseProduct } from "../type";

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { id, buyer, products } = req.body;

    if (!id.length) {
      res.status(400);
      throw new Error("'id' não deve estar vazio");
    }

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser do tipo string");
    }

    const [purchaseIdExist] = await db("purchases").where({ id: id });

    if (purchaseIdExist) {
      res.status(400);
      throw new Error("'id' já cadastrado, digite outro valor");
    }

    if (!buyer.length) {
      res.status(400);
      throw new Error("'buyer' não deve estar vazio");
    }

    if (typeof buyer !== "string") {
      res.status(400);
      throw new Error("'buyer' deve ser do tipo string");
    }

    const [buyerExist] = await db("users").where({ id: buyer });

    if (!buyerExist) {
      res.status(404);
      throw new Error("Usuário não cadastrado");
    }

    if (products.length === 0) {
      res.status(400);
      throw new Error(
        "'products' deve conter pelo menos um produto para que o pedido seja realizado"
      );
    }

    for (let i in products) {
      if (typeof products[i].productId !== "string") {
        res.status(400);
        throw new Error(
          `'productId' no indice ${i} do array products deve ser string`
        );
      }
    }

    for (let i in products) {
      const [productIdExist] = await db("products").where({
        id: products[i].productId,
      });
      if (!productIdExist) {
        res.status(404);
        throw new Error(
          `'productId' no indice ${i} do array products não está cadastrado`
        );
      }
    }

    for (let i in products) {
      if (typeof products[i].quantity !== "number") {
        res.status(400);
        throw new Error(
          `'quantity' no indice ${i} do array products deve ser number`
        );
      }
    }

    for (let i in products) {
      if (products[i].quantity <= 0) {
        res.status(400);
        throw new Error(
          `'quantity' no indice ${i} do array products deve ser maior que zero`
        );
      }
    }

    let totalPrice = 0;
    for (let product of products) {
      const [productPrice] = await db
        .select("price")
        .from("products")
        .where({ id: product.productId });

      totalPrice += productPrice.price * product.quantity;
    }

    const newPurchase: TPurchase = {
      id,
      buyer,
      total_price: totalPrice,
    };

    await db("purchases").insert(newPurchase);

    for (let product of products) {
      const [purchasesProductExist] = await db("purchases_products")
        .where({ purchase_id: id })
        .andWhere({ product_id: product.productId });

      if (purchasesProductExist) {
        await db("purchases_products")
          .update({
            quantity: purchasesProductExist.quantity + product.quantity,
          })
          .where({ purchase_id: id })
          .andWhere({ product_id: product.productId });
      } else {
        const newPurchaseProduct: TPurchaseProduct = {
          purchase_id: id,
          product_id: product.productId,
          quantity: product.quantity,
        };
        await db("purchases_products").insert(newPurchaseProduct);
      }
    }

    res.status(201).send({ message: "Pedido realizado com sucesso" });
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
