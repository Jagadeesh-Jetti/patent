import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://patient-management-backend-zeta.vercel.app/ward";

export const fetchWards = createAsyncThunk("ward/fetchWards", async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addNewWard = createAsyncThunk(
  "ward/addNewWard",
  async (newWard) => {
    try {
      const response = await axios.post(url, newWard);
      return response.data.ward;
    } catch (error) {
      throw error;
    }
  }
);

export const updateWard = createAsyncThunk(
  "ward/updateWard",
  async ({ id, newData }) => {
    try {
      const response = await axios.put(`${url}/${id}`, newData);
      return response.data.ward;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteWard = createAsyncThunk("ward/deleteWard", async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}`);
    return response.data.ward;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  wards: [],
  status: "idle",
  error: null,
  sortBy: "",
  filter: "",
};

export const wardSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWards.fulfilled, (state, action) => {
        state.status = "success";
        state.wards = action.payload;
      })
      .addCase(fetchWards.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addNewWard.fulfilled, (state, action) => {
        state.status = "success";
        state.wards.push(action.payload);
      })
      .addCase(addNewWard.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateWard.fulfilled, (state, action) => {
        state.status = "success";
        const updatedWard = action.payload;
        const index = state.wards.findIndex((w) => w._id === updatedWard._id);
        if (index !== -1) {
          state.wards[index] = updatedWard;
        }
      })
      .addCase(updateWard.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteWard.fulfilled, (state, action) => {
        state.status = "success";
        const deletedWardId = action.payload._id;
        state.wards = state.wards.filter((ward) => ward._id !== deletedWardId);
      })
      .addCase(deleteWard.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setFilter, setSortBy } = wardSlice.actions;

export default wardSlice.reducer;
