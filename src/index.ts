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

app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(products)
})

app.get("/purchases", (req: Request, res: Response) => {
  res.status(200).send(purchases)
})

app.get("/product/search", (req: Request, res: Response) => {
  const query = req.query.q as string
  const result = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )

  res.status(200).send(result)
})

app.post("/users", (req: Request, res: Response) => {
  const body = req.body
  const { id, email, password } = body

  const newUser: TUser = {
    id,
    email,
    password,
  }

  users.push(newUser)

  res.status(201).send("Cadastro realizado com sucesso")
})

app.post("/products", (req: Request, res: Response) => {
  const body = req.body
  const { id, name, price, category } = body

  const newProduct: TProduct = {
    id,
    name,
    price,
    category,
  }

  products.push(newProduct)

  res.status(201).send("Produto cadastrado com sucesso")
})

app.post("/purchases", (req: Request, res: Response) => {
  const body = req.body
  const { userId, productId, quantity, totalPrice } = body

  const newPurchase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice,
  }

  purchases.push(newPurchase)

  res.status(201).send("Compra realizada com sucesso")
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
  const userPurchases = purchases.filter(
    (purchase) => purchase.userId === id
  );

  if (userPurchases.length > 0) {
    res.status(200).send(userPurchases);
  } else {
    res.status(404).send("Nenhuma compra encontrada para esse usuário");
  }
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  
  const index = users.findIndex(user => user.id === id);

  if (index >= 0) {
    users.splice(index, 1);
    res.status(200).send("User apagado com sucesso");
  } else {
    res.status(404).send("User não encontrado");
  }
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  
  const index = products.findIndex((product) => product.id === id);
  
  if (index !== -1) {
    products.splice(index, 1);
    res.status(200).send("Produto apagado com sucesso");
  } else {
    res.status(404).send("Produto não encontrado");
  }
});

app.put("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { email, password } = req.body;

  const userToEdit = users.find((user) => user.id === id);

  if (userToEdit) {
    userToEdit.email = email ?? userToEdit.email;
    userToEdit.password = password ?? userToEdit.password;
  }

  res.status(200).send("Cadastro atualizado com sucesso");
});

app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newCategory = req.body.category as PRODUCT_CATEGORY | undefined;

  const productToEdit = products.find((product) => {
    return product.id === id;
  });

  if (productToEdit) {
    productToEdit.name = newName || productToEdit.name;
    productToEdit.price = isNaN(newPrice as number) ? productToEdit.price : newPrice as number;
    productToEdit.category = newCategory || productToEdit.category;
  }

  res.status(200).send("Produto atualizado com sucesso");
});