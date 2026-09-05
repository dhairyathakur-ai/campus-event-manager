import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import EventCard from "./EventCard";

function EventList({ userId }) {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get("/events/");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  const handleRegister = async (eventId) => {
    if (!userId) {
      setMessage("Please log in first to register.");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/events/${eventId}/register`,
        null,
        { params: { user_id: userId } }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Upcoming Events</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        events.map((event) => (
          <EventCard key={event.id} event={event} onRegister={handleRegister} />
        ))
      )}
    </div>
  );
}

export default EventList;
