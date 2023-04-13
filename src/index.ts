import express, { Request, Response } from "express"
import cors from "cors"
import { products, purchases, users } from "./database"
import { TProduct, TPurchase, TUser } from "./type"

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