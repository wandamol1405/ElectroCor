import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(persist((set) => ({
  items: {},
  addItem: (product) =>
    set((state) => {
      const items = { ...state.items };
      if (items[product.id_product]) {
        items[product.id_product].quantity += 1;
      } else {
        items[product.id_product] = { ...product, quantity: 1 };
      }
      return { items };
    }),
    updateItemQuantity: (productId, newQuantity) =>
    set((state) => {
      const items = { ...state.items };
      if (items[productId]) {
        items[productId].quantity = newQuantity;
      }
      return { items };
    }),
    removeItem: (productId) =>
    set((state) => {
      const items = { ...state.items };
      delete items[productId];
      return { items };
    }),
}), {
    name: "cartStorage", 
    getStorage: ()=>localStorage
}));

export default useCartStore;
