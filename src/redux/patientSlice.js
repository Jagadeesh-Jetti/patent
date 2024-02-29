import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://patient-management-backend-zeta.vercel.app/patients";

export const fetchPatients = createAsyncThunk(
  "patient/fetchPatients",
  async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewPatient = createAsyncThunk(
  "patient/addNewPatient",
  async (newPatient) => {
    try {
      const response = await axios.post(url, newPatient);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updatePatient = createAsyncThunk(
  "patient/updatePatient",
  async ({ id, newData }) => {
    try {
      const response = await axios.put(`${url}/${id}`, newData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deletePatient = createAsyncThunk(
  "patient/deletePatient",
  async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  patients: [],
  status: "idle",
  error: null,
};

export const patientSlice = createSlice({
  name: "patients",
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
      .addCase(fetchPatients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = "success";
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addNewPatient.fulfilled, (state, action) => {
        state.status = "success";
        state.patients.push(action.payload);
      })
      .addCase(addNewPatient.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.status = "success";
        const updatedPatient = action.payload;
        const index = state.patients.findIndex(
          (p) => p._id === updatedPatient._id
        );
        if (index !== -1) {
          state.patients[index] = updatedPatient;
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.status = "success";
        const deletedPatientId = action.payload._id;
        state.patients = state.patients.filter(
          (patient) => patient._id !== deletedPatientId
        );
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setFilter, setSortBy } = patientSlice.actions;

export default patientSlice.reducer;
