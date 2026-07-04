import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function capitalizeWords(text: string) {
  return text
    .split(" ")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(" ");
}

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState<any>({});

  useEffect(() => {

    axios.get(
      `http://localhost:3000/profile/${localStorage.getItem("name")}`
    )

    .then((response) => {

      setUser(response.data);

    })

    .catch((error) => {

      console.log(error);

    });

  }, []);

  return (
    <>
      <h1>Student Profile</h1>

      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{capitalizeWords(user.name || "")}</h2>
          </div>

        </div>

        <hr />

        <div className="profile-details">

          <p>
            <strong>📧 Email:</strong> {user.email}
          </p>

          <p>
            <strong>🎓 Department:</strong> {user.department}
          </p>

          <p>
            <strong>📱 Phone:</strong> {user.phone}
          </p>

          <p>
            <strong>👤 Role:</strong> {capitalizeWords(user.role || "")}
          </p>

        </div>

        <div className="profile-buttons">

          <button
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>

        </div>

      </div>

    </>
  );
}

export default Profile;