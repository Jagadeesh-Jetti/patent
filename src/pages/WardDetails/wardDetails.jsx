import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteWard } from "../../redux/wardSlice";
import "../WardDetails/wardDetails.css";

export const WardDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ward = useSelector((state) =>
    state.wards.wards.find((ward) => ward._id === id)
  );

  const handleDelete = () => {
    dispatch(deleteWard(ward?._id));
    navigate("/wards");
  };

  return (
    <div className="ward-details-container">
      <h1>Ward Details</h1>
      <p>Ward Number: {ward?.wardNumber}</p>
      <p>Capacity: {ward?.capacity}</p>
      <p>Ward Type: {ward?.wardType}</p>
      <div className="button-container">
        <button className="edit-button">
          <Link to={`/ward/edit/${ward?._id}`} state={ward}>
            Edit
          </Link>
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};
