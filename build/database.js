"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
const type_1 = require("./type");
exports.users = [
    {
        id: "u001",
        email: "usuario1@email.com",
        password: "xxxx",
    },
    {
        id: "u002",
        email: "usuario2@email.com",
        password: "xxxx",
    }
];
exports.products = [
    {
        id: "p001",
        name: "Cake",
        price: 20,
        category: type_1.PRODUCT_CATEGORY.FOOD,
    },
    {
        id: "p003",
        name: "Monitor HD",
        price: 100,
        category: type_1.PRODUCT_CATEGORY.ELECTRONICS,
    }
];
exports.purchases = [
    {
        userId: exports.users[0].id,
        productId: exports.products[0].id,
        quantity: 1,
        totalPrice: exports.products[0].price * 1,
    },
    {
        userId: exports.users[1].id,
        productId: exports.products[1].id,
        quantity: 2,
        totalPrice: exports.products[1].price * 2,
    },
];
//# sourceMappingURL=database.js.map