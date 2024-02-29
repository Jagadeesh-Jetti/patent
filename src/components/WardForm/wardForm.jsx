import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateWard, addNewWard } from "../../redux/wardSlice";
import "../WardForm/wardForm.css";

export const WardForm = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ward = state ? state : null;

  const [data, setData] = useState({
    wardNumber: ward ? ward.wardNumber : "",
    wardType: ward ? ward.wardType : "",
    capacity: ward ? ward.capacity : "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const isFormValid = () => {
    return (
      data.wardNumber !== "" && data.wardType !== "" && data.capacity !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const newWard = {
        wardNumber: data.wardNumber,
        wardType: data.wardType,
        capacity: data.capacity,
      };

      if (ward) {
        dispatch(updateWard({ id: ward?._id, newData: newWard }));
      } else {
        dispatch(addNewWard(newWard));
      }

      setData({
        wardNumber: "",
        wardType: "",
        capacity: "",
      });
      navigate("/wards");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="ward_form">
      <h2>{ward ? "Edit Ward" : "Add Ward"}</h2>
      <div className="form-div-child">
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
          name="wardType"
          value={data?.wardType}
          onChange={handleInput}
          placeholder="Ward Type"
          type="text"
        />
        <input
          className="input-field"
          name="capacity"
          value={data?.capacity}
          onChange={handleInput}
          placeholder="Capacity"
          type="number"
        />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        {ward ? "Update" : "Add"}
      </button>
    </div>
  );
};
