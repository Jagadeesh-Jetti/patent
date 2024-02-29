import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Wards/ward.css";
import { fetchWards } from "../../redux/wardSlice";

export const Wards = () => {
  const dispatch = useDispatch();
  const { wards, status, error } = useSelector((state) => state.wards);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWards());
    }
  }, [status, dispatch]);

  return (
    <div className="wards-container">
      <div className="header">
        <div className="title">Ward</div>
        <Link to="/add-ward" className="add-ward-link">
          Add Ward
        </Link>
      </div>
      {status === "loading" && <p>Loading....</p>}
      {error && <p>Error: {error}</p>}
      <div className="ward-display">
        <table className="table">
          <thead>
            <tr>
              <th>Ward Number</th>
              <th>Ward Type</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {wards.map((ward) => (
              <tr key={ward?._id}>
                <td>
                  <Link to={`/ward/${ward._id}`} className="ward-link">
                    {ward.wardNumber}
                  </Link>
                </td>
                <td>{ward.wardType}</td>
                <td>{ward.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
