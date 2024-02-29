import "../Navbar/navbar.css";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2 className="title"> Patient Management </h2>

      <div className="options_container">
        <h3 onClick={() => navigate("/")}> Patients </h3>
        <h3 onClick={() => navigate("/hospital")}>Hospital</h3>
        <h3 onClick={() => navigate("/wards")}> Wards</h3>
      </div>
    </div>
  );
};
