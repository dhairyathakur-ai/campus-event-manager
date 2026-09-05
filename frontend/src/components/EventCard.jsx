function EventCard({ event, onRegister }) {
  const formattedDate = new Date(event.date).toLocaleString();

  return (
    <div style={styles.card}>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {formattedDate}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <button onClick={() => onRegister(event.id)}>Register</button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
  },
};

export default EventCard;