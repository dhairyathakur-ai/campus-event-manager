import { useState } from "react";
import Login from "./components/Login";
import EventList from "./components/EventList";
import CreateEventForm from "./components/CreateEventForm";

function App() {
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogin = (data) => {
    setUser(data);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Campus Event Manager</h1>

      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <p>Logged in as: {user.role}</p>
          {user.role === "organizer" && (
            <CreateEventForm
              organizerId={user.user_id}
              onEventCreated={() => setRefreshKey((k) => k + 1)}
            />
          )}
          <EventList key={refreshKey} userId={user.user_id} />
        </div>
      )}
    </div>
  );
}

export default App;