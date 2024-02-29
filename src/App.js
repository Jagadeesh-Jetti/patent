import { Navbar } from "./components/Navbar/navbar";
import { Routes, Route } from "react-router-dom";
import { Hospital } from "./pages/Hospital/hospital";
import { Patients } from "./pages/Patients/patient";
import { Wards } from "./pages/Wards/ward";
import { PatientDetails } from "./pages/PatientDetails/patientDetails";
import { WardDetails } from "./pages/WardDetails/wardDetails";
import { PatientForm } from "./components/PatientForm/patientForm";
import { WardForm } from "./components/WardForm/wardForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPatients } from "./redux/patientSlice";
import { fetchWards } from "./redux/wardSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchWards());
  }, [dispatch]);
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Patients />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/wards" element={<Wards />} />

        <Route path="/patient/:id" element={<PatientDetails />} />
        <Route path="/ward/:id" element={<WardDetails />} />

        <Route path="/add-patient" element={<PatientForm />} />
        <Route path="/add-ward" element={<WardForm />} />

        <Route path="/patient/edit/:id" element={<PatientForm />} />
        <Route path="/ward/edit/:id" element={<WardForm />} />
      </Routes>
    </div>
  );
}

export default App;
