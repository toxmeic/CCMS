import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFileAlt,
  FaClock,
  FaSpinner,
  FaCheckCircle
} from "react-icons/fa";

function Dashboard() {

  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [progress, setProgress] = useState(0);
  const [resolved, setResolved] = useState(0);

  useEffect(() => {

    axios.get("http://localhost:3000/allComplaints")

    .then((response) => {

      let complaints = response.data;

      if (localStorage.getItem("role") === "student") {

        complaints = complaints.filter(
          (complaint: any) =>
            complaint.studentName === localStorage.getItem("name")
        );

      }

      setTotal(complaints.length);

      setPending(
        complaints.filter(
          (complaint: any) => complaint.status === "Pending"
        ).length
      );

      setProgress(
        complaints.filter(
          (complaint: any) => complaint.status === "In Progress"
        ).length
      );

      setResolved(
        complaints.filter(
          (complaint: any) => complaint.status === "Resolved"
        ).length
      );

    })

    .catch((error) => {

      console.log(error);

    });

  }, []);

  return (
    <>
      <h1>Dashboard</h1>

      <div className="card-container">

        <Card
          title="Total Complaints"
          value={total}
          icon={<FaFileAlt />}
        />

        <Card
          title="Pending"
          value={pending}
          icon={<FaClock />}
        />

        <Card
          title="In Progress"
          value={progress}
          icon={<FaSpinner />}
        />

        <Card
          title="Resolved"
          value={resolved}
          icon={<FaCheckCircle />}
        />

      </div>
    </>
  );
}

export default Dashboard;