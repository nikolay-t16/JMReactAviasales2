import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchId } from "../services/aviasales-services";
import { receiveErrorSearchId } from "../helpers/vars/errorMessage";

interface userState {
  searchId: string;
  errorMassage: string;
}

const initialState: userState = {
  searchId: "",
  errorMassage: "",
};

export const getSearchIdFromApi: any = createAsyncThunk(
  "user/searchId",
  async () => {
    const response = await getSearchId();
    const { searchId } = response;
    return searchId;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchIdFromApi.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(getSearchIdFromApi.rejected, (state: userState) => {
        state.errorMassage = receiveErrorSearchId;
      });
  },
});

// export const {} = userSlice.actions

export default userSlice.reducer;
