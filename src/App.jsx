import React, { useState } from "react";
import { useApp } from "./context/AppContext";

import AuthModule from "./components/Auth/AuthModule";
import CreateConference from "./components/Conference/CreateConference";
import ConferenceView from "./components/Conference/ConferenceView";
import UserDashboard from "./components/Dashboard/UserDashboard";

const App = () => {
  const { user, getUserRole } = useApp();

  const [view, setView] = useState("dashboard");
  const [selectedConf, setSelectedConf] = useState(null);

  /* ---------------- AUTH CHECK ---------------- */
  if (!user) return <AuthModule />;

  /* ---------------- CREATE VIEW ---------------- */
  if (view === "create") {
    return (
      <CreateConference
        onCancel={() => setView("dashboard")}
        onSuccess={() => setView("dashboard")}
      />
    );
  }

  /* ---------------- CONFERENCE VIEW ---------------- */
  if (view === "conference" && selectedConf) {
    const role = getUserRole(selectedConf);

    return (
      <ConferenceView
        conf={selectedConf}
        role={role}
        onBack={() => setView("dashboard")}
      />
    );
  }

  /* ---------------- DASHBOARD ---------------- */
  return (
    <UserDashboard
      onSelectConf={(conf) => {
        setSelectedConf(conf);
        setView("conference");
      }}
      onCreateConf={() => setView("create")}
    />
  );
};

export default App;
