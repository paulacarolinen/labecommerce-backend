export type TUser = {
  id: string;
  email: string;
  password: string;
};

export enum PRODUCT_CATEGORY {
  FOOD = "Food",
  ACCESSORIES = "Acessórios",
  CLOTHES_AND_SHOES = "Roupas e calçados",
  ELECTRONICS = "Eletrônicos"
}

export type TProduct = {
    id: string;
    name: string;
    price: number;
    category: PRODUCT_CATEGORY
};

export type TPurchase = {
    userId: string;
    productId: string;
    quantity: number;
    totalPrice: number;
};