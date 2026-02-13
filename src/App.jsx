import React, { useState } from "react";
import { useApp } from "./context/AppContext";

import AuthModule from "./components/Auth/AuthModule";
import CreateConference from "./components/Conference/CreateConference";
import ConferenceView from "./components/Conference/ConferenceView";
import UserDashboard from "./components/Dashboard/UserDashboard";

const App = () => {
  const { user, getUserRole, toasts } = useApp();

  const [view, setView] = useState("dashboard");
  const [selectedConf, setSelectedConf] = useState(null);

  if (!user) return <AuthModule />;

  if (view === "create") {
    return (
      <>
        <CreateConference
          onCancel={() => setView("dashboard")}
          onSuccess={() => setView("dashboard")}
        />
        <ToastContainer toasts={toasts} />
      </>
    );
  }

  if (view === "conference" && selectedConf) {
    const role = getUserRole(selectedConf);

    return (
      <>
        <ConferenceView
          conf={selectedConf}
          role={role}
          onBack={() => setView("dashboard")}
        />
        <ToastContainer toasts={toasts} role={role} />
      </>
    );
  }

  return (
    <>
      <UserDashboard
        onSelectConf={(conf) => {
          setSelectedConf(conf);
          setView("conference");
        }}
        onCreateConf={() => setView("create")}
      />
      <ToastContainer toasts={toasts} />
    </>
  );
};

export default App;

/* ================= TOAST UI ================= */

const ToastContainer = ({ toasts, role }) => {
  const roleColors = {
    organizer: "from-indigo-600 to-purple-600",
    reviewer: "from-emerald-600 to-green-600",
    presenter: "from-blue-600 to-cyan-600",
  };

  return (
    <div className="fixed bottom-6 right-6 space-y-4 z-[999]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`relative overflow-hidden px-6 py-4 rounded-xl shadow-2xl text-sm font-semibold text-white bg-gradient-to-r ${
            role && roleColors[role]
              ? roleColors[role]
              : "from-indigo-600 to-purple-600"
          } animate-slideIn`}
          style={{ minWidth: "260px" }}
        >
          {toast.message}

          <div
            className="absolute bottom-0 left-0 h-1 bg-white/70 animate-progress"
            style={{
              animationDuration: `${toast.duration}ms`,
            }}
          />
        </div>
      ))}
    </div>
  );
};
