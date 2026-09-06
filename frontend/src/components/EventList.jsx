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
    <div className="panel">
      <div className="event-list-header">
        <h2>Upcoming events</h2>
        <span className="event-count">{events.length} listed</span>
      </div>
      {message && <p className="msg-success">{message}</p>}
      {events.length === 0 ? (
        <div className="empty-state">No events yet. Check back soon.</div>
      ) : (
        events.map((event) => (
          <EventCard key={event.id} event={event} onRegister={handleRegister} />
        ))
      )}
    </div>
  );
}

export default EventList;