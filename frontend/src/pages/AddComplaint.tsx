import { useState } from "react";
import axios from "axios";

function AddComplaint() {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Classroom");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  function handleSubmit(e: React.FormEvent) {
      if (
      !title.trim() ||
      !category.trim() ||
      !description.trim() ||
     !location.trim()
      ) {
      alert("Please fill in all fields.");
  return;
}
    e.preventDefault();

    axios.post("http://localhost:3000/addComplaint", {
      title,
      category,
      description,
      location,
      studentName: localStorage.getItem("name"),
      email: localStorage.getItem("email")
    })

    .then(() => {

      alert("Complaint Submitted Successfully");

      setTitle("");
      setCategory("Classroom");
      setDescription("");
      setLocation("");

    })

    .catch((error) => {

      console.log(error);

      alert("Failed to Submit Complaint");

    });

  }

  return (
    <>
      <h1>Add Complaint</h1>

      <form className="complaint-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Classroom</option>
          <option>Laboratory</option>
          <option>Library</option>
          <option>Internet/WiFi</option>
          <option>Electrical</option>
          <option>Hostel</option>
          <option>Other</option>
        </select>

        <textarea
          rows={5}
          placeholder="Describe your complaint"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button type="submit">
          Submit
        </button>

      </form>
    </>
  );
}

export default AddComplaint;