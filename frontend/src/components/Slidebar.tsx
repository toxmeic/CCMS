import { MdDashboard } from "react-icons/md";
import { FaClipboardList, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
function Sidebar() {
    const navigate = useNavigate();
function handleLogout() {
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
}
    return (
        <div className="sidebar">
            <h2>Admin Panel</h2>

            <ul>
                <li
                    onClick={() => {
                        window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                        });
                    }}
                    >
                    <MdDashboard />
                    Dashboard
                </li>

                <li
                    onClick={() => {
                        const section = document.getElementById("complaints-section");
                        section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    >
                    <FaClipboardList />
                    Complaints
                </li>

                <Link to="/students" className="sidebar-link">
                    <li>
                        <FaUsers />
                        Students
                    </li>
                </Link>

                <li onClick={handleLogout}>
                    <FaSignOutAlt />
                    Logout
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;