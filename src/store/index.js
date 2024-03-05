import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import categorySlice from "./slice/categorySlice";
export default configureStore({
    reducer: {
        auth: authSlice,
        category: categorySlice,
    }
});