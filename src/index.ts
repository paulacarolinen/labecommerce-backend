import {
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  getProductById,
  queryProductsByName,
  createPurchase,
  getAllPurchasesFromUserId,
} from "./database";
import { PRODUCT_CATEGORY } from "./type";

createUser("u01", "usuario@email.com", "xxxx");
getAllUsers();
createProduct("p004", "Monitor HD", 800, PRODUCT_CATEGORY.ELECTRONICS);
getAllProducts();
getProductById("p004");
queryProductsByName("monitor");
createPurchase("u003", "p004", 2, 1600);
getAllPurchasesFromUserId("u003");