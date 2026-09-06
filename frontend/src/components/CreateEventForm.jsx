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
    <div className="panel">
      <h3>Post a new event</h3>
      {error && <p className="msg-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input
            name="title"
            placeholder="e.g. Tech Fest 2026"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="What's this event about?"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Date & time</label>
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Location</label>
          <input
            name="location"
            placeholder="e.g. Main Auditorium"
            value={form.location}
            onChange={handleChange}
          />
        </div>
        <button className="btn-primary" type="submit">Post event</button>
      </form>
    </div>
  );
}

export default CreateEventForm;