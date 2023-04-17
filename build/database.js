"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
const type_1 = require("../type");
exports.users = [
    {
        id: "u001",
        name: "User1",
        email: "user1@email.com",
        password: "xxxx",
    },
    {
        id: "u002",
        name: "User2",
        email: "user2@email.com",
        password: "xxxx",
    },
];
exports.products = [
    {
        id: "p001",
        name: "Cake",
        price: 20,
        category: type_1.PRODUCT_CATEGORY.FOOD,
        description: "description",
        imageUrl: "imageUrl",
    },
    {
        id: "p003",
        name: "Monitor HD",
        price: 100,
        category: type_1.PRODUCT_CATEGORY.ELECTRONICS,
        description: "description",
        imageUrl: "imageUrl",
    },
];
exports.purchases = [
    {
        purchaseId: "pu001",
        userId: exports.users[0].id,
        productId: exports.products[0].id,
        totalPrice: exports.products[0].price * 1,
    },
    {
        purchaseId: "pu001",
        userId: exports.users[1].id,
        productId: exports.products[1].id,
        totalPrice: exports.products[1].price * 2,
    },
];
//# sourceMappingURL=database.js.map