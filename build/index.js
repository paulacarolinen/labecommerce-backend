"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const type_1 = require("./type");
(0, database_1.createUser)("u01", "usuario@email.com", "xxxx");
(0, database_1.getAllUsers)();
(0, database_1.createProduct)("p004", "Monitor HD", 800, type_1.PRODUCT_CATEGORY.ELECTRONICS);
(0, database_1.getAllProducts)();
(0, database_1.getProductById)("p004");
(0, database_1.queryProductsByName)("monitor");
(0, database_1.createPurchase)("u003", "p004", 2, 1600);
(0, database_1.getAllPurchasesFromUserId)("u003");
//# sourceMappingURL=index.js.map