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


function Students() {

  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {

    axios.get(
      "http://localhost:3000/students"
    )

    .then((response) => {

      setStudents(response.data);

    })

    .catch((error) => {

      console.log(error);

    });

  }, []);

  function deleteStudent(id: string) {

    if (window.confirm("Delete this account?")) {

      axios.delete(
        `http://localhost:3000/deleteStudent/${id}`
      )

      .then(() => {

        setStudents(
          students.filter(
            student => student._id !== id
          )
        );

      });

    }

  }

  return (
    <>
      <h1>Students</h1>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {students.map((item) => (

            <tr key={item._id}>

              <td>{capitalizeWords(item.name)}</td>
              <td>{item.email}</td>
              <td>{item.department}</td>
              <td>{capitalizeWords(item.role)}</td>

              <td>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteStudent(item._id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </>
  );
}

export default Students;