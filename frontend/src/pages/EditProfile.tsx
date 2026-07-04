import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EditProfile() {

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

  function handleUpdate(e: React.FormEvent) {

    e.preventDefault();

    axios.put(
      `http://localhost:3000/updateProfile/${user._id}`,
      {
        name: user.name,
        email: user.email,
        department: user.department,
        phone: user.phone
      }
    )

    .then((response) => {

      localStorage.setItem(
        "name",
        response.data.name
      );

      alert("Profile Updated Successfully");

      navigate("/profile");

    })

    .catch((error) => {

      console.log(error);

      alert("Failed to Update Profile");

    });

  }

  return (
    <>
      <h1>Edit Profile</h1>

      <form
        className="edit-profile-form"
        onSubmit={handleUpdate}
      >

        <input
          type="text"
          placeholder="Name"
          value={user.name || ""}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={user.email || ""}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Department"
          value={user.department || ""}
          onChange={(e) =>
            setUser({
              ...user,
              department: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={user.phone || ""}
          onChange={(e) =>
            setUser({
              ...user,
              phone: e.target.value
            })
          }
        />

        <button type="submit">
          Save Changes
        </button>

      </form>
    </>
  );
}

export default EditProfile;