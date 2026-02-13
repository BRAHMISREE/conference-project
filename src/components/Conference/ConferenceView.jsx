import React, { useState, useMemo } from "react";
import { ArrowRight, LayoutDashboard, Globe } from "lucide-react";

import ModernTemplate from "./Templates/ModernTemplate";
import ClassicTemplate from "./Templates/ClassicTemplate";
import RoleBasedDashboard from "../Dashboard/RoleBasedDashboard";

const ConferenceView = ({ conf, role, onBack }) => {
  const [viewMode, setViewMode] = useState("home");

  /* ================= TEMPLATE RESOLUTION ================= */

  const RenderTemplate = useMemo(() => {
    switch (conf.template) {
      case "classic":
        return ClassicTemplate;
      case "modern":
      default:
        return ModernTemplate;
    }
  }, [conf.template]);

  /* ================= SAFE ROLE CHECK ================= */

  const hasDashboardAccess = !!role;

  /* ================= VIEW SWITCH ================= */

  const handleSwitch = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#0f1117] text-slate-200">

      {/* ================= NAVIGATION ================= */}

      <nav className="bg-[#0f1117]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center sticky top-0 z-50">

        {/* Left Side */}
        <div className="flex items-center gap-6">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 border border-white/5 transition">
              <ArrowRight className="rotate-180" size={14} />
            </div>
            Back to Hub
          </button>

          <div className="h-6 w-px bg-white/10" />

          <span className="font-bold text-white truncate max-w-xs tracking-wide">
            {conf.name}
          </span>
        </div>

        {/* Right Side Toggle */}
        <div className="flex bg-black/40 p-1.5 rounded-full border border-white/5">

          {/* Site Preview */}
          <button
            onClick={() => handleSwitch("home")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              viewMode === "home"
                ? "bg-white text-black shadow-lg"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Globe size={14} />
            Site
          </button>

          {/* Dashboard */}
          {hasDashboardAccess && (
            <button
              onClick={() => handleSwitch("dashboard")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === "dashboard"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <LayoutDashboard size={14} />
              {role === "organizer" ? "Admin" : "Dashboard"}
            </button>
          )}
        </div>
      </nav>

      {/* ================= CONTENT AREA ================= */}

      <div className="flex-1 bg-black overflow-y-auto relative transition-all duration-300">

        {viewMode === "home" && (
          <div className="animate-fadeIn">
            <RenderTemplate conf={conf} />
          </div>
        )}

        {viewMode === "dashboard" && hasDashboardAccess && (
          <div className="animate-fadeIn">
            <RoleBasedDashboard conf={conf} role={role} />
          </div>
        )}

      </div>
    </div>
  );
};

export default ConferenceView;
