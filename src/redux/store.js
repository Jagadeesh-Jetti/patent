import { configureStore } from "@reduxjs/toolkit";

import { hospitalSlice } from "./hospitalSlice";
import { patientSlice } from "./patientSlice";
import { wardSlice } from "./wardSlice";

export default configureStore({
  reducer: {
    wards: wardSlice.reducer,
    hospital: hospitalSlice.reducer,
    patients: patientSlice.reducer,
  },
});
