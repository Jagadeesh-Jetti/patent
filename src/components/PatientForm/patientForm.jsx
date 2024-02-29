import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updatePatient,
  addNewPatient,
  fetchPatients,
} from "../../redux/patientSlice";
import "../PatientForm/patientForm.css";

export const PatientForm = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patient = state ? state : null;

  const [data, setData] = useState({
    name: patient ? patient.name : "",
    age: patient ? patient.age : "",
    gender: patient ? patient.gender : "",
    issues: patient ? patient.issues : [],
    admittedDate: patient ? patient.admittedDate : "",
    dischargedDate: patient ? patient.dischargedDate : "",
    wardNumber: patient ? patient.wardNumber : "",
    phoneNumber: patient ? patient.phoneNumber : "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "issues") {
      setData({ ...data, [name]: value.trim().split(" ") });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const isFormValid = () => {
    return (
      data.name !== "" &&
      data.age !== "" &&
      data.gender !== "" &&
      data.issues.length > 0 &&
      data.wardNumber !== "" &&
      data.phoneNumber !== "" &&
      data.admittedDate !== "" &&
      data.dischargedDate !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const newPatient = {
        name: data.name,
        age: data.age,
        gender: data.gender,
        issues: data.issues,
        wardNumber: data.wardNumber,
        phoneNumber: data.phoneNumber,
        admittedDate: data.admittedDate,
        dischargedDate: data.dischargedDate,
      };

      if (patient) {
        dispatch(updatePatient({ id: patient._id, newData: newPatient }));
      } else {
        await dispatch(addNewPatient(newPatient));
      }
      await dispatch(fetchPatients());
      setData({
        name: "",
        age: "",
        gender: "",
        issues: [],
        wardNumber: "",
        phoneNumber: "",
        admittedDate: "",
        dischargedDate: "",
      });

      navigate("/");
    } else {
      alert("Please fill in all fields correctly");
    }
  };

  return (
    <div className="patient_form">
      <h2>{patient ? "Edit Patient" : "Add Patient"}</h2>

      <div className="form-div-child">
        <input
          className="input-field"
          name="name"
          value={data?.name}
          onChange={handleInput}
          placeholder="Name"
          type="text"
        />
        <input
          className="input-field"
          name="age"
          value={data?.age}
          onChange={handleInput}
          placeholder="Age"
          type="number"
        />
        <input
          className="input-field"
          name="gender"
          value={data?.gender}
          onChange={handleInput}
          placeholder="Gender"
          type="text"
        />
        <input
          className="input-field"
          name="issues"
          value={data?.issues.join(" ")}
          onChange={handleInput}
          placeholder="Medical Issues"
          type="text"
        />
        <input
          className="input-field"
          name="wardNumber"
          value={data?.wardNumber}
          onChange={handleInput}
          placeholder="Ward Number"
          type="number"
        />
        <input
          className="input-field"
          name="phoneNumber"
          value={data?.phoneNumber}
          onChange={handleInput}
          placeholder="Contact Number"
          type="number"
        />
        <input
          className="input-field"
          name="admittedDate"
          value={data?.admittedDate}
          onChange={handleInput}
          placeholder="Admitted Date"
          type="date"
        />
        <input
          className="input-field"
          name="dischargedDate"
          value={data?.dischargedDate}
          onChange={handleInput}
          placeholder="Discharged Date"
          type="date"
        />
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        {patient ? "Update" : "Add"}
      </button>
    </div>
  );
};
