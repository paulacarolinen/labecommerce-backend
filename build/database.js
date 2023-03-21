"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
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
exports.products = [
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
exports.purchases = [
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
//# sourceMappingURL=database.js.map