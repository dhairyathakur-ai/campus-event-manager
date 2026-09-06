function EventCard({ event, onRegister }) {
  const formattedDate = new Date(event.date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="event-card">
      <div className="event-card-body">
        <h3>{event.title}</h3>
        {event.description && <p className="event-card-desc">{event.description}</p>}
        <div className="event-meta">
          <span>📅 {formattedDate}</span>
          {event.location && <span>📍 {event.location}</span>}
        </div>
      </div>
      <button className="btn-accent" onClick={() => onRegister(event.id)}>
        Register
      </button>
    </div>
  );
}

export default EventCard;