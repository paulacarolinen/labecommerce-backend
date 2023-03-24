"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = void 0;
const users = [];
const products = [];
const purchases = [];
function createUser(id, email, password) {
    const newUser = {
        id,
        email,
        password,
    };
    users.push(newUser);
    console.log("Cadastro realizado com sucesso");
}
exports.createUser = createUser;
function getAllUsers() {
    console.log(users);
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    const newProduct = {
        id,
        name,
        price,
        category,
    };
    products.push(newProduct);
    console.log("Produto criado com sucesso");
}
exports.createProduct = createProduct;
function getAllProducts() {
    console.log(products);
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    const productId = products.find((product) => product.id.toLowerCase() === idToSearch.toLowerCase());
    if (productId) {
        console.log(productId);
    }
    else {
        console.log('Produto não encontrado');
    }
}
exports.getProductById = getProductById;
function queryProductsByName(name) {
    const productName = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    if (productName) {
        console.log(productName);
    }
    else {
        console.log('Produto não encontrado');
    }
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    purchases.push(newPurchase);
    console.log("Compra realizada com sucesso");
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userIdToSearch) {
    const userPurchasesIds = purchases
        .filter((purchase) => purchase.userId.toLowerCase() === userIdToSearch.toLowerCase())
        .map((purchase) => purchase.productId);
    if (userPurchasesIds.length !== 0) {
        const userProducts = products.filter((product) => userPurchasesIds.includes(product.id));
        console.log(userProducts);
    }
    else {
        console.log('Produto não encontrado');
    }
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map