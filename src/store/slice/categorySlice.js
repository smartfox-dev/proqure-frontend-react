import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toastr } from "../../utils/toastr";
import { serverURL } from "../../config";
import axios from "axios";
import { isEmpty } from "../../utils";

const initialState = {
  isAuthenticated: false,
  categoryList: [], //category list
  itemList: [], //top product list
  shopItemList: [], //shop product list
  citemList: [], //category list
  searchList: [], //search product list
  wishList: [], //wish list
  cartList: [], //cart list
  messageList: [], //message list
  sortedItemList: [], //sorted product list
  reviewList: [], //review list
  pendingList: [], //pending orded list
  errors: {},
  redirect: false,
  minmaxPrice: {},
};

export const getPayment = createAsyncThunk(
  "category/getPayment",
  async (params) => {
    try {
      const res = await axios.post(serverURL + "/api/payment/order", params);
      let data = await res.data;
      console.log("getPaymentResponse", data);
      if (data.status === 0) {
        toastr.success(data.message, 3000);
      } else {
        toastr.warning("Please try again later", 3000);
      }
      return data;
    } catch (err) {
      console.log("getPaymentError", err);
    }
  }
)


export const setRegisterReview = createAsyncThunk(
  "category/setRegisterReview",
  async (params) => {
    try {
      const res = await axios.post(serverURL + "/api/reviews/register", params);
      const data = await res.data;
      if (data.status === 0) {
        toastr.success(data.message, 0);
      }
      if (data.status === 1) {
        toastr.info(data.message, 0);
      }
      return data;
    } catch (error) {
      console.log("setRegisterReview", error);
    }
  }
);

export const setFeaturedCategory = createAsyncThunk(
  "category/setFeaturedCategory",
  async () => {
    try {
      const res = await axios.post(serverURL + "/api/category/categorylist");
      const data = await res.data;
      return data.list;
    } catch (error) {}
  }
);

export const setItemList = createAsyncThunk(
  "category/setItemList",
  async (params) => {
    try {
      const res = await axios.post(serverURL + "/api/category/itemlist", params);
      const data = await res.data;
      return data;
    } catch (error) {
      console.log("setItemList", error);
    }
  }
);

export const setFilterList = createAsyncThunk(
  "category/setFilterList",
  async (params) => {
    try{
      const res = await axios.post(serverURL + "/api/category/filterlist", params);
      const data = res.data;
      console.log("filterlist:", data)
      return data 
    }
    catch(error) {
      console.log("setFilterList", error);
    }
  }
)
export const setRitemList = createAsyncThunk(
  "category/setRitemList",
  async (params) => {
    try {
      const res = await axios.post(serverURL + "/api/category/related", params);
      const data = await res.data;
      return data;
    } catch (error) {
      console.log("setItemList", error);
    }
  }
);


export const getPendingList = createAsyncThunk(
  "category/getPendingList",
  async (params) => {
    try {
      console.log("params:", params)
      const res = await axios.post(serverURL + "/api/category/getPendingList", params);
      const data = res.data;
      console.log("getpendinglist_data:", data);
      return data;
    } catch (err) {
      console.log("getPendingListError:", err);
    }
  }
);

export const addWishItem = createAsyncThunk(
  "category/addWishItem",
  async (params) => {
    try {
      const res = await axios.post(serverURL + "/api/item/addwishitem", params);
      const data = await res.data;
      if (data.status === 0) {
        toastr.success(data.message, 0);
      }
      if (data.status === 1) {
        toastr.info(data.message, 0);
      }
      return data;
    } catch (error) {
      console.log("removeWishItem", error);
    }
  }
);

export const removeWishItem = createAsyncThunk(
  "category/removeWishItem",
  async (params) => {
    try {
      const res = await axios.post(
        serverURL + "/api/item/removewishitem",
        params
      );
      const data = await res.data;
      if (data.status === 0) {
        toastr.success(data.message, 0);
      }
      if (data.status === 1) {
        toastr.warning(data.message, 0);
      }
      console.log("removewishItem", data);
      return data;
    } catch (error) {
      console.log("removeWishItem", error);
    }
  }
);

export const removeMessageItem = createAsyncThunk(
  "category/removeMessageItem",
  async (params) => {
    try {
      const res = await axios.post(
        serverURL + "/api/sent/messagedelete",
        params
      );
      const data = await res.data;
      if (data.status === 0) {
        toastr.success(data.message, 0);
      }
      if (data.status === 1) {
        toastr.warning(data.message, 0);
      }
      console.log("removewishItem", data);
      return data;
    } catch (error) {
      console.log("removeWishItem", error);
    }
  }
);

export const addCartItem = createAsyncThunk(
  "category/addCartItem",
  async (params) => {
    try {
      console.log("addcartitem", params);
      let delay = 900;
      if (!isEmpty(params.delay)) {
        delay = params.delay;
      }
      const res = await axios.post(serverURL + "/api/item/addcartitem", params);
      const data = res.data;
      console.log("resaddcartitem:", data);
      if (data.status === 0) {
        toastr.success(data.message, delay);
      }
      if (data.status === 1) {
        toastr.info(data.message, delay);
      }
      return data;
    } catch (error) {
      console.log("addCartItem", error);
    }
  }
);

export const addToBagItem = createAsyncThunk(
  "category/addToBagItem",
  async (params) => {
    try {
      const res = await axios.post(serverURL + "/api/item/addcartitem", params);
      const data = res.data;
      console.log("resaddcartitem:", data);
      if (data.status === 0) {
        toastr.success(data.message, 0);
      }
      if (data.status === 1) {
        toastr.info(data.message, 0);
      }
      return data;
    } catch (error) {
      console.log("addCartItem", error);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "category/removeCartItem",
  async (params) => {
    try {
      console.log("removecartitem", params);
      const res = await axios.post(
        serverURL + "/api/item/removecartitem",
        params
      );
      const data = res.data;
      console.log("removecartitem", data);
      if (data.status === 0) {
        toastr.success(data.message, 0);
      }
      if (data.status === 1) {
        toastr.warning(data.message, 0);
      }
      return data;
    } catch (error) {
      console.log("removeCartItem", error);
    }
  }
);

export const quantityChange = createAsyncThunk(
  "category/quantityChange",
  async (params) => {
    try {
      const res = await axios.post(
        serverURL + "/api/item/quantitychange",
        params
      );
      const data = await res.data;
      console.log("quantitychange", data);
      // if(data.status === 0){
      //     toastr.success(data.message);
      // }
      // if (data.status === 1) {
      //     toastr.info(data.message);
      // }
      return data;
    } catch (error) {
      console.log("quantityChange", error);
    }
  }
);

export const setMessageList = createAsyncThunk(
  "category/setMessageList",
  async (params) => {
    try{
      const res = await axios.post(serverURL + "/api/category/messagelist", params);
      const data = res.data;
      console.log("messagelist", data);
      return data;
    }
    catch(error){
      console.log("setMessageList", error);
    }
  }
);

export const categorySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setRedirect: (state, action) => {
      state.redirect = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setFeaturedCategory.fulfilled, (state, action) => {
      const data = action.payload;
      state.categoryList = data;
    });
    builder.addCase(setItemList.fulfilled, (state, action) => {
      const data = action.payload;
      console.log("minmaxPrice", data);
      state.citemList = data?.clist; //category list
      state.itemList = data?.toplist; //top product list
      state.searchList = data?.searchlist; //search product list
      state.shopItemList = data?.list; //shop product list
      state.wishList = data?.wishlist; //wish list
      state.cartList = data?.cartlist; //cart list
      state.messageList = data?.messagelist; //message list
      state.sortedItemList = data?.sortedArray; //sorted product list
      state.minmaxPrice = data?.minmaxPrice[0];
    });
    builder.addCase(setRitemList.fulfilled, (state, action) => {
      const data = action.payload;
      state.shopItemList = data.list;
    });
    builder.addCase(setFilterList.fulfilled, (state, action) => {
      const data = action.payload;
      state.shopItemList = data.list;
    });
    builder.addCase(addWishItem.fulfilled, (state, action) => {
      const data = action.payload;
      if (data.status === 0) {
        state.wishList = data.result[1];
      }
    });
    builder.addCase(removeWishItem.fulfilled, (state, action) => {
      const data = action.payload;
      if (data.status === 0) {
        state.wishList = data.result[1];
      }
    });
    builder.addCase(addCartItem.fulfilled, (state, action) => {
      const data = action.payload;
      if (isEmpty(data)) {
        state.redirect = true;
        return;
      }
      if (data.status === 0) {
        state.cartList = data.result[1];
      }
    });
    builder.addCase(addToBagItem.fulfilled, (state, action) => {
      const data = action.payload;
       if (isEmpty(data)) {
        state.redirect = true;
        return;
      }
      if (data.status === 0) {
        state.cartList = data.result[1];
      }
    });
    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      const data = action.payload;
      if(isEmpty(data)){
        state.redirect = true;
        return;
      }
      if (data.status === 0) {
        state.cartList = data.result[1];
      }
    });
    builder.addCase(getPayment.fulfilled, (state, action) => {
      const data = action.payload;
      console.log("getPayment_list:",data)
      if (isEmpty(data)) {
        state.redirect = true;
        return;
      }
      if (data.status === 0) {
        state.getPendingList = data.list;
        state.cartList = [];
      }
    });
    builder.addCase(quantityChange.fulfilled, (state, action) => {
      const data = action.payload;
       if (isEmpty(data)) {
        state.redirect = true;
        return;
      }
      if (data.status === 0) {
        state.cartList = data.result[1];
      }
    });
    builder.addCase(setMessageList.fulfilled, (state, action) => {
      const data = action.payload;
      if(data.status === 0){
        state.messageList = data.list;
      }
    });
    builder.addCase(getPendingList.fulfilled, (state, action) => {
      const data = action.payload;
      if(data.status === 0){
        state.pendingList = data.list;
      }
    })
    // builder.addCase(setRegisterReview.fulfilled, (state, action) => {
    //     const data = action.payload;
    //     console.log(data);
    //     if (data.status === 0) {
    //         state.reviewList = data.result[1];
    //    }
    // })
    builder.addCase(removeMessageItem.fulfilled, (state, action) => {
      const data = action.payload;
      state.messageList = data.result[1];
    });
  },
});

export const { setErrors, setRedirect } = categorySlice.actions;

export default categorySlice.reducer;
