import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchRepositories } from "./utils";
import { RepositoriesState } from "./types";
import { RequestStatus } from "../../consts";

const initialState: RepositoriesState = {
  data: null,
  status: RequestStatus.IDLE,
  error: null,
  selected: null,
};

export const searchRepositories = createAsyncThunk(
  "repositories/searchRepositories",
  async (params: URLSearchParams) => {
    return await fetchRepositories(params);
  }
);

export const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    reset: (state) => {
      state.data = initialState.data;
      state.status = initialState.status;
      state.error = initialState.error;
      state.selected = initialState.selected;
    },
    select: (state, action) => {
      if (state.data !== null) {
        state.selected =
          state.data.items.find((item) => item.id === action.payload) || null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRepositories.pending, (state, action) => {
        state.status = RequestStatus.LOADING;
        state.error = null;
      })
      .addCase(searchRepositories.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(searchRepositories.rejected, (state, action) => {
        state.status = RequestStatus.FAILED;
        state.data = null;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const selectSearchStatus = (state: RootState) =>
  state.repositories.status;
export const selectRepos = (state: RootState) => state.repositories.data;
export const selectSelectedRepo = (state: RootState) =>
  state.repositories.selected;
export const selectError = (state: RootState) => state.repositories.error;

export const { reset, select } = repositoriesSlice.actions;

export default repositoriesSlice.reducer;
