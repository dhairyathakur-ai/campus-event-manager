import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function CreateEventForm({ organizerId, onEventCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!organizerId) {
      setError("You must be logged in as an organizer to create events.");
      return;
    }
    try {
      await axiosInstance.post("/events/", form, {
        params: { organizer_id: organizerId },
      });
      setForm({ title: "", description: "", date: "", location: "" });
      setError("");
      onEventCreated();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create event");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
      <h3>Create New Event</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        name="title"
        placeholder="Event title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <br />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <br />
      <input
        type="datetime-local"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <br />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default CreateEventForm;