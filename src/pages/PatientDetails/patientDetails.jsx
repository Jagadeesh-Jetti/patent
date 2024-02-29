import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePatient } from "../../redux/patientSlice";
import { fetchPatients } from "../../redux/patientSlice";
import "../PatientDetails/patientDetails.css";

export const PatientDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patient = useSelector((state) =>
    state.patients.patients.find((patient) => patient._id === id)
  );

  const handleDelete = async () => {
    if (!patient) {
      console.error("Patient not found!");
      return;
    }

    await dispatch(deletePatient(patient._id));
    await dispatch(fetchPatients());
    navigate("/");
  };

  return (
    <div className="patient-details-container">
      {patient ? (
        <>
          <h2>Patient Details</h2>
          <p>Name: {patient.name}</p>
          <p>Age: {patient.age}</p>
          <p>Gender: {patient.gender}</p>
          <p>Ward Number: {patient.wardNumber}</p>
          <p>Contact: {patient.phoneNumber}</p>
          <p>Admitted Date: {patient.admittedDate}</p>
          <p>Discharged Date: {patient.dischargedDate}</p>
          <p className="issues">Issues:</p>
          <div className="issues-container">
            {patient.issues.map((issue, index) => (
              <div key={index} className="issue">
                {issue}
              </div>
            ))}
          </div>

          <div className="button-container">
            <button className="edit-button">
              <Link to={`/patient/edit/${patient._id}`} state={patient}>
                Edit
              </Link>
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </>
      ) : (
        <p>Patient not found</p>
      )}
    </div>
  );
};
