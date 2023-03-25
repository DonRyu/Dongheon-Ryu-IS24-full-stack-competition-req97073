import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const product = createAsyncThunk("auth/login", async (info) => {
  const res = await axios({
    url: `http://localhost:3000/api/products/${info.path}`,
    data: info.data,
    method: info.method,
  });

  if (res.data.msg) {
  }
  return res.data;
});

const productSlice = createSlice({
  name: "auth",
  initialState: {
    productList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(product.fulfilled, (state, action) => {
     if(!action.payload.msg){
      state.productList = action.payload;
     }
    });
  },
});

export default productSlice.reducer;
export { product };
