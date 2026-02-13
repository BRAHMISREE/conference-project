import React from "react";
import OrganizerDashboard from "./OrganizerDashboard";
import PresenterDashboard from "./PresenterDashboard";
import ReviewerDashboard from "./ReviewerDashboard";

const RoleBasedDashboard = ({ conf, role }) => {

  const renderDashboard = () => {
    switch (role) {
      case "organizer":
        return <OrganizerDashboard conf={conf} />;

      case "presenter":
        return <PresenterDashboard conf={conf} />;

      case "reviewer":
        return <ReviewerDashboard conf={conf} />;

      default:
        return (
          <div className="flex items-center justify-center min-h-[60vh] text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                No Dashboard Access
              </h2>
              <p className="text-slate-400">
                You do not have a dashboard role assigned for this conference.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-slate-200 p-8">
      {renderDashboard()}
    </div>
  );
};

export default RoleBasedDashboard;
