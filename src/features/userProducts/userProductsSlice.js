import { createSlice } from "@reduxjs/toolkit";

export function generateUniqueId() {
  const randomPart = Math.ceil(Math.random() * 1000000);
  const datePart = new Date().getTime();
  return `id_${datePart}_${randomPart}`;
}

const uniqueId = generateUniqueId();
const uniqueId2 = generateUniqueId();


const initialState = {
  products: [
    {
      id: uniqueId,
      brand: "Apple",
      category: "Smart Phone",
      title: "Iphone 15 Pro Max",
      description: "This is very nice and smart phone",
      availabilityStatus: "In Stock",
      price: 1500,
      discountPercentage: 3,
    },
    {
      id: uniqueId2,
      brand: "Apple2",
      category: "Smart Phone",
      title: "Iphone 15 Pro Max",
      description: "This is very nice and smart phone",
      availabilityStatus: "Low Stock",
      price: 1500,
      discountPercentage: 3,
    },
  ],
};

const userProductsSlice = createSlice({
  name: "userProducts",
  initialState,
  reducers: {
    showUserProducts: (state) => state,
    addUserProduct: (state, action) => {
      state.products.push(action.payload);
    },

    updateUserProduct: (state, action) => {
      const {
        id,
        title,
        availabilityStatus,
        brand,
        category,
        price,
        description,
        discountPercentage,
      } = action.payload;
      const product = state.products.find((product) => product.id === id);
      console.log(product)
      if (product) {
        product.title = title;
        product.availabilityStatus = availabilityStatus;
        product.brand = brand;
        product.category = category;
        product.price = price;
        product.description = description;
        product.discountPercentage = discountPercentage;
      }
    },

    removeUserProduct: (state, action) => {
      const id = action.payload;
      state.products = state?.products.filter((product) => product.id !== id);
    },
  },
});

export const {
  showUserProducts,
  addUserProduct,
  updateUserProduct,
  removeUserProduct,
} = userProductsSlice.actions;
export default userProductsSlice.reducer;