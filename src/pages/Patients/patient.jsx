import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPatients } from "../../redux/patientSlice";
import "../Patients/patient.css";

export const Patients = () => {
  const dispatch = useDispatch();
  const { patients, status, error } = useSelector((state) => state.patients);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
    }
  }, [status, dispatch]);

  return (
    <div className="patient-container">
      <div className="header">
        <div className="title">Patients</div>
        <Link to="/add-patient" className="add-patient-link">
          Add Patient
        </Link>
      </div>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="patients-display">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Ward Number</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient?._id}>
                <td>
                  <Link to={`/patient/${patient._id}`} className="patient-link">
                    {patient.name}
                  </Link>
                </td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.wardNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
