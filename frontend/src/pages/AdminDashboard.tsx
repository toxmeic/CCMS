import Card from "../components/Card";
import Sidebar from "../components/Slidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import {
FaClock,
FaSpinner,
FaCheckCircle,
FaClipboardList
} from "react-icons/fa";

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

function AdminDashboard() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [updatingId, setUpdatingId] = useState("");
  useEffect(() => {

  axios.get("http://localhost:3000/allComplaints")

  .then((response) => {

    const updatedData = response.data.map((item: any) => ({
      ...item,
      className:
        item.status === "Pending"
          ? "pending"
          : item.status === "In Progress"
          ? "progress"
          : "resolved",
      date: new Date(item.date).toLocaleDateString()
    }));

    setComplaints(updatedData);

  })

  .catch((error) => {

    console.log(error);

  });

}, []);
  const filteredComplaints = complaints.filter(
  (item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All" || item.status === filter)
  );


  const sortedComplaints = [...filteredComplaints].sort((a, b) => {
  const dateA = new Date(a.date).getTime();
  const dateB = new Date(b.date).getTime();

  return sortOrder === "Newest"
    ? dateB - dateA
    : dateA - dateB;
});


  const stats = [
{
  title: "Total Complaints",
  value: complaints.length,
  icon: <FaClipboardList />
},
{
  title: "Pending",
  value: complaints.filter(
    item => item.status === "Pending"
  ).length,
  icon: <FaClock />
},
{
  title: "In Progress",
  value: complaints.filter(
    item => item.status === "In Progress"
  ).length,
  icon:<FaSpinner className="spin" />
},
{
  title: "Resolved",
  value: complaints.filter(
    item => item.status === "Resolved"
  ).length,
  icon: <FaCheckCircle />
}
];

  function updateStatus(index: number) {

  const complaint = complaints[index];

  let newStatus = "";

  if (complaint.status === "Pending") {

    newStatus = "In Progress";

  }

  else if (complaint.status === "In Progress") {

    newStatus = "Resolved";

  }

  else {

    return;

  }
  setUpdatingId(complaint._id);
  axios.put(
    `http://localhost:3000/updateStatus/${complaint._id}`,
    {
      status: newStatus
    }
  )

  .then(() => {

    const updatedComplaints = [...complaints];

    updatedComplaints[index].status = newStatus;

    updatedComplaints[index].className =
      newStatus === "In Progress"
        ? "progress"
        : "resolved";

    setComplaints(updatedComplaints);
    setUpdatingId("");
  })
  .catch((error) => {

    console.log(error);

    setUpdatingId("");

});
}

function deleteComplaint(index: number) {

  if (window.confirm("Delete this complaint?")) {

    axios.delete(
      `http://localhost:3000/deleteComplaint/${complaints[index]._id}`
    )

    .then(() => {

      setComplaints(
        complaints.filter((_, i) => i !== index)
      );

    });

  }

}
  
  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="admin-content">

        <h1>Admin Dashboard</h1>

        <div className="card-container">
          {stats.map((item) => (

        <Card
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />

        ))}
      </div>
<br />
<br />
<div className="search-section">

  <div className="search-filter">

    <input
      type="text"
      placeholder="Search complaints..."
      className="search-box"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <select
      className="filter-box"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option>All</option>
      <option>Pending</option>
      <option>In Progress</option>
      <option>Resolved</option>
    </select>

    <select
      className="sort-box"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option>Newest</option>
      <option>Oldest</option>
    </select>

  </div>

  {filteredComplaints.length > 0 && (
    <p className="complaint-count">
      {filteredComplaints.length} complaints found
    </p>
  )}

</div>

 {filteredComplaints.length === 0 ? (

  <p className="no-data">
    No complaints found 😕
  </p>

):(
<div id="complaints-section">
  <table>

    <thead>
      <tr>
        <th>Title</th>
        <th>Category</th>
        <th>Date</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>

      {sortedComplaints.map((item) => (

        <tr key={item._id}>
          <td>{capitalizeWords(item.title)}</td>
          <td>{capitalizeWords(item.category)}</td>
          <td>{item.date}</td>

          <td className={item.className}>
            {item.status}
          </td>

          <td className="action-buttons">

            {item.status !== "Resolved" ? (


            <button
              onClick={() =>
                updateStatus(
                  complaints.findIndex(
                    complaint => complaint._id === item._id
                  )
                )
              }
              disabled={updatingId === item._id}
            >
              {updatingId === item._id ? "Updating..." : "Update"}
            </button>

            ) : (

              <div className="empty-space"></div>

            )}

            <button
              className="delete-btn"
             onClick={() =>
              deleteComplaint(
                complaints.findIndex(
                  complaint => complaint._id === item._id
                )
              )
            }
            >
              Delete
            </button>
          </td>

        </tr>

      ))}

    </tbody>

  </table>
</div>
)}

      </div>

    </div>
  );
}

export default AdminDashboard;