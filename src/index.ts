import express, { Request, Response } from "express"
import cors from "cors"
import { products, purchases, users } from "./database"
import { PRODUCT_CATEGORY, TProduct, TPurchase, TUser } from "./type"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003")
})

app.get("/users", async (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar usuários" });
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar produtos" });
  }
});

app.get("/purchases", (req: Request, res: Response) => {
  res.status(200).send(purchases)
})

app.get("/product/search", async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    if (!query || query.trim().length === 0) {
      return res
        .status(400)
        .send({ error: "O parâmetro de busca deve conter pelo menos um caractere" });
    }

    const result = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar produto" });
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, email, password } = req.body;

    if (!id || !email || !password) {
      return res.status(400).send({ error: "Dados incompletos" });
    }

    const existingUser = users.find((user) => user.id === id || user.email === email);
    if (existingUser) {
      return res.status(400).send({ error: "Usuário já cadastrado" });
    }

    const newUser: TUser = {
      id,
      email,
      password,
    };

    users.push(newUser);

    res.status(201).send("Cadastro realizado com sucesso");
  } catch (error) {
    res.status(500).send({ error: "Erro ao criar usuário" });
  }
});

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, category } = req.body;


    if (!id || !name || !price || !category) {
      return res.status(400).send({ error: "Dados incompletos" });
    }

    const existingProduct = products.find((product) => product.id === id);
    if (existingProduct) {
      return res.status(400).send({ error: "Produto já cadastrado" });
    }

    const newProduct: TProduct = {
      id,
      name,
      price,
      category,
    };

    products.push(newProduct);

    res.status(201).send("Produto cadastrado com sucesso");
  } catch (error) {
    res.status(500).send({ error: "Erro ao criar produto" });
  }
});

app.post("/purchases", (req: Request, res: Response) => {
  try {
    const body = req.body
    const { userId, productId, quantity, totalPrice } = body

    if (!userId || !productId || !quantity || !totalPrice) {
      throw new Error("Todos os campos são obrigatórios")
    }

    const userExists = users.find((user) => user.id === userId)
    if (!userExists) {
      throw new Error("Usuário não encontrado")
    }

    const productExists = products.find((product) => product.id === productId)
    if (!productExists) {
      throw new Error("Produto não encontrado")
    }

    const newPurchase: TPurchase = {
      userId,
      productId,
      quantity,
      totalPrice,
    }

    purchases.push(newPurchase)

    res.status(201).send("Compra realizada com sucesso")
  } catch (error:any) {
    res.status(400).send(error.message)
  }
})

app.get("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === id);

  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send("Produto não encontrado");
  }
});

app.get("/users/:id/purchases", (req: Request, res: Response) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(404).send("Usuário não encontrado");
    return;
  }

  const userPurchases = purchases.filter((purchase) => purchase.userId === id);

  res.status(200).send(userPurchases);
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    res.status(404).send("Usuário não encontrado");
    return;
  }

  users.splice(userIndex, 1);

  res.status(200).send("Usuário apagado com sucesso");
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    res.status(404).send("Produto não encontrado");
    return;
  }

  products.splice(productIndex, 1);

  res.status(200).send("Produto apagado com sucesso");
});

app.put("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { email, password } = req.body;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    res.status(404).send("Usuário não encontrado");
    return;
  }

  if (!email && !password) {
    res.status(400).send("Por favor, forneça novas informações para atualização do cadastro");
    return;
  }

  const editedUser = { ...users[userIndex] };

  editedUser.email = email ?? editedUser.email;
  editedUser.password = password ?? editedUser.password;

  users[userIndex] = editedUser;

  res.status(200).send("Cadastro atualizado com sucesso");
});

app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    res.status(404).send("Produto não encontrado");
    return;
  }

  const { name, price, category } = req.body;

  if (!name && !price && !category) {
    res.status(400).send("Por favor, forneça novas informações para atualização do produto");
    return;
  }

  const editedProduct = { ...products[productIndex] };

  editedProduct.name = name ?? editedProduct.name;
  editedProduct.price = (price !== undefined && !isNaN(Number(price))) ? Number(price) : editedProduct.price;
  editedProduct.category = category ?? editedProduct.category;

  products[productIndex] = editedProduct;

  res.status(200).send("Produto atualizado com sucesso");
});