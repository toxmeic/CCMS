import { Link } from "react-router-dom";

function Home() {

  const role = localStorage.getItem("role");

  return (
    <>
      <div className="hero">

        <h1>Campus Complaint Management System</h1>

        <p>
          Raise complaints with ease and track their status efficiently.
        </p>

        {!role && (
          <div className="home-buttons">
            <Link to="/login">
              <button>Get Started</button>
            </Link>
          </div>
        )}

        {role === "student" && (
          <div className="home-buttons">
            <Link to="/dashboard">
              <button>Go to Dashboard</button>
            </Link>
          </div>
        )}

        {role === "admin" && (
          <div className="home-buttons">
            <Link to="/admin">
              <button>Go to Admin Panel</button>
            </Link>
          </div>
        )}

      </div>

      <div className="features">

        <div className="feature-card">
          <h2>Complaint Submission</h2>
          <p>
            Students can easily submit complaints online.
          </p>
        </div>

        <div className="feature-card">
          <h2>Complaint Tracking</h2>
          <p>
            Track the status of complaints in real time.
          </p>
        </div>

        <div className="feature-card">
          <h2>Admin Management</h2>
          <p>
            Admins can manage and resolve complaints efficiently.
          </p>
        </div>

      </div>
    </>
  );
}

export default Home;