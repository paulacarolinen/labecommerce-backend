import { TUser, PRODUCT_CATEGORY, TProduct, TPurchase } from "./type";

export const users: TUser[] = [
  {
    id: "u001",
    email: "usuario@email.com",
    password: "xxxx",
  },
  {
    id: "u002",
    email: "usuaio@email.com",
    password: "xxxx",
  },
  {
    id: "u003",
    email: "usuaio@email.com",
    password: "xxxx",
  }
]

export const products: TProduct[] = [
  {
    id: "p001",
    name: "Cake",
    price: 20,
    category: PRODUCT_CATEGORY.FOOD,
  },
  {
    id: "p003",
    name: "Monitor HD",
    price: 100,
    category: PRODUCT_CATEGORY.ELECTRONICS,
  }
]
export const purchases: TPurchase[] = [
  {
    userId: users[0].id,
    productId: products[0].id,
    quantity: 1,
    totalPrice: products[0].price * 1,
  },
  {
    userId: users[1].id,
    productId: products[1].id,
    quantity: 2,
    totalPrice: products[1].price * 2,
  },
]

// import { TUser, TProduct, TPurchase, PRODUCT_CATEGORY } from "./type";

// const users: TUser[] = [];
// const products: TProduct[] = [];
// const purchases: TPurchase[] = [];

// export function createUser(id: string, email: string, password: string): void {
//   const newUser = {
//     id,
//     email,
//     password,
//   };
//   users.push(newUser);

//   console.log("Cadastro realizado com sucesso");
// }

// export function getAllUsers(): void {
//   console.log(users);
// }

// export function createProduct(
//   id: string,
//   name: string,
//   price: number,
//   category: PRODUCT_CATEGORY
// ): void {
//   const newProduct = {
//     id,
//     name,
//     price,
//     category,
//   };

//   products.push(newProduct);

//   console.log("Produto criado com sucesso");
// }

// export function getAllProducts() {
//   console.log(products);
// }

// export function getProductById(idToSearch: string): void {
//   const productId = products.find(
//     (product) => product.id.toLowerCase() === idToSearch.toLowerCase()
//   );

//   if (productId) {
//     console.log(productId);
//   } else {
//     console.log("Produto não encontrado");
//   }
// }

// export function queryProductsByName(name: string): void {
//   const productName = products.filter((product) =>
//     product.name.toLowerCase().includes(name.toLowerCase())
//   );

//   if (productName) {
//     console.log(productName);
//   } else {
//     console.log("Produto não encontrado");
//   }
// }

// export function createPurchase(
//   userId: string,
//   productId: string,
//   quantity: number,
//   totalPrice: number
// ): void {
//   const newPurchase = {
//     userId,
//     productId,
//     quantity,
//     totalPrice,
//   };
//   purchases.push(newPurchase);

//   console.log("Compra realizada com sucesso");
// }

// export function getAllPurchasesFromUserId(userIdToSearch: string): void {
//   const userPurchasesIds = purchases
//     .filter(
//       (purchase) =>
//         purchase.userId.toLowerCase() === userIdToSearch.toLowerCase()
//     )
//     .map((purchase) => purchase.productId);

//   if (userPurchasesIds.length !== 0) {
//     const userProducts = products.filter((product) =>
//       userPurchasesIds.includes(product.id)
//     );
//     console.log(userProducts);
//   } else {
//     console.log("Produto não encontrado");
//   }
// }