import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTopPerformingWard, updateState } from "../../redux/hospitalSlice";
import "../Hospital/hospital.css";

export const Hospital = () => {
  const dispatch = useDispatch();
  const hospital = useSelector((state) => state.hospital);
  const patients = useSelector((state) => state.patients.patients);
  const wards = useSelector((state) => state.wards.wards);

  useEffect(() => {
    const totalPatients = patients.length;

    const totalCapacity = wards.reduce(
      (total, ward) => total + parseFloat(ward.capacity),
      0
    );

    const occupancyRate = ((totalPatients / totalCapacity) * 100).toFixed(2);

    let topPerformingWard = wards[0];
    let maxOccupancyRate =
      (topPerformingWard?.capacity - totalPatients) /
      topPerformingWard?.capacity;

    for (const w of wards) {
      const wardOccupancyRate = (w.capacity - totalPatients) / w.capacity;
      if (wardOccupancyRate > maxOccupancyRate) {
        maxOccupancyRate = wardOccupancyRate;
        topPerformingWard = w;
      }
    }

    let totalLengthOfStay = 0;
    let averageStay = 0;

    if (totalPatients > 0) {
      for (const p of patients) {
        const admissionDate = p.admittedDate;
        const dischargeDate = p.dischargedDate;

        if (admissionDate && dischargeDate) {
          const stayDurationInMilliseconds =
            new Date(dischargeDate) - new Date(admissionDate);
          const stayDurationInDays =
            stayDurationInMilliseconds / (1000 * 60 * 60 * 24);
          totalLengthOfStay += stayDurationInDays;
        }
      }

      averageStay = totalLengthOfStay / totalPatients;
    }

    dispatch(
      updateState({
        totalPatients,
        occupancyRate,
        topPerformingWard,
        averageStay,
      })
    );

    dispatch(setTopPerformingWard(topPerformingWard));
  }, [patients, wards, dispatch]);

  return (
    <div className="hospital-container">
      <h1>Hospital Stats</h1>
      <div className="hospital-stats">
        <div className="stat-item">
          <h3>Total Patients:</h3>
          <p>{hospital?.totalPatients}</p>
        </div>
        <div className="stat-item">
          <h3>Occupancy Rate:</h3>
          <p>{hospital?.occupancyRate}%</p>
        </div>
        <div className="stat-item">
          <h3>Average Stay:</h3>
          <p>{hospital?.averageStay} days</p>
        </div>
        <div className="stat-item">
          <h3>Top Performing Ward:</h3>
          <p>{hospital?.topPerformingWard?.wardNumber}</p>
        </div>
      </div>
    </div>
  );
};
