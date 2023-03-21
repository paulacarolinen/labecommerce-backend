import { TUser, TProduct, TPurchase } from "./type";

export const users: TUser[] = [
  {
    id: "pessoa1",
    email: "pessoa1@email.com",
    password: "xxxx",
  },
  {
    id: "pessoa2",
    email: "pessoa2@email.com",
    password: "xxxx",
  },
];

export const products: TProduct[] = [
  {
    id: "bolo",
    name: "bolo",
    price: 10,
    category: "food",
  },
  {
    id: "pão",
    name: "pão",
    price: 10,
    category: "food",
  },
];

export const purchases: TPurchase[] = [
  {
    userId: "pessoa1",
    productId: "bolo",
    quantity: 2,
    totalPrice: 20,
  },
  {
    userId: "pessoa2",
    productId: "pão",
    quantity: 4,
    totalPrice: 40,
  },
];
