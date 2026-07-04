import { NavLink, useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  function logout() {
    localStorage.removeItem("role");
    navigate("/");
  }

  return (
    <nav>
      <NavLink to="/">Home</NavLink>

      {!role && (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}

      {role === "student" && (
        <>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/addcomplaint">Add Complaint</NavLink>
          <NavLink to="/mycomplaints">My Complaints</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink
          to="/"
          onClick={() => {
            localStorage.removeItem("role");
          }}
          >
           Logout
          </NavLink>
        </>
      )}

      {role === "admin" && (
        <>
          <NavLink to="/admin">Admin</NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;