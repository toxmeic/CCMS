import { useEffect, useState } from "react";
import axios from "axios";

function MyComplaints() {

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3000/allComplaints")

        .then((response) => {

            const myComplaints = response.data.filter(
                (complaint: any) =>
                    complaint.studentName === localStorage.getItem("name")
            );

            setComplaints(myComplaints);

        })

        .catch((error) => {

            console.log(error);

        });

    }, []);

    return (
        <>
            <h1>My Complaints</h1>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {complaints.map((complaint: any) => (

                        <tr key={complaint._id}>

                            <td>{complaint.title}</td>

                            <td>{complaint.category}</td>

                            <td
                                className={
                                    complaint.status === "Pending"
                                        ? "pending"
                                        : complaint.status === "Resolved"
                                        ? "resolved"
                                        : "progress"
                                }
                            >
                                {complaint.status}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </>
    );
}

export default MyComplaints;