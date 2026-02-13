import React, { useState, useMemo } from "react";
import {
  Calendar,
  Layout,
  LogOut,
  Plus,
  Search,
  Bell,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const UserDashboard = ({ onSelectConf, onCreateConf }) => {
  const { user, conferences, logout, notifications } = useApp();

  const [activeTab, setActiveTab] = useState("my");
  const [search, setSearch] = useState("");
  const [showNotif, setShowNotif] = useState(false);

  /* ================= FILTERED DATA ================= */

  const myConfs = useMemo(
    () =>
      conferences.filter(
        (c) =>
          c.roles &&
          c.roles[user.id] &&
          c.name.toLowerCase().includes(search.toLowerCase())
      ),
    [conferences, user.id, search]
  );

  const otherConfs = useMemo(
    () =>
      conferences.filter(
        (c) =>
          (!c.roles || !c.roles[user.id]) &&
          c.name.toLowerCase().includes(search.toLowerCase())
      ),
    [conferences, user.id, search]
  );

  const userNotifications = useMemo(
    () => notifications.filter((n) => n.userId === user.id),
    [notifications, user.id]
  );

  const unreadCount = useMemo(
    () => userNotifications.filter((n) => !n.read).length,
    [userNotifications]
  );

  /* ================= CONFERENCE CARD ================= */

  const ConfCard = ({ conf, myRole }) => (
    <div className="group bg-slate-900 border border-white/5 rounded-[2rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-300 flex flex-col">
      <div
        className="h-56 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${conf.banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

        {myRole && (
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {myRole}
          </div>
        )}

        <div className="absolute bottom-4 left-6 right-6">
          <span className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest block">
            {conf.location}
          </span>
          <h3 className="font-bold text-2xl text-white truncate">
            {conf.name}
          </h3>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-5">
          <Calendar size={14} className="text-indigo-500" />
          {conf.date}
        </div>

        <p className="text-slate-400 text-sm line-clamp-2 mb-8 flex-1">
          {conf.description}
        </p>

        <button
          onClick={() => onSelectConf(conf)}
          className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
            myRole
              ? "bg-white text-black hover:bg-slate-200"
              : "bg-white/5 text-white hover:bg-white/10 border border-white/5"
          }`}
        >
          {myRole ? "Enter Dashboard" : "View Homepage"}
        </button>
      </div>
    </div>
  );

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">

      {/* Top Nav */}
      <nav className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white">
              <Layout size={20} />
            </div>
            <span className="font-bold text-xl text-white">
              ConfManager
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6 relative">

            {/* Search */}
            <div className="hidden md:flex items-center bg-white/5 rounded-full px-4 py-2 gap-3 border border-white/5">
              <Search size={16} />
              <input
                className="bg-transparent outline-none text-sm w-48 text-white placeholder-slate-500"
                placeholder="Find an event..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="text-slate-400 hover:text-white relative"
              >
                <Bell size={20} />

                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-[10px] flex items-center justify-center rounded-full text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotif && (
                <div className="absolute right-0 mt-4 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-4 space-y-3 z-50">
                  {userNotifications.length > 0 ? (
                    userNotifications.map((n) => (
                      <div
                        key={n.id}
                        className="text-sm text-slate-300 bg-white/5 p-3 rounded-xl"
                      >
                        {n.message}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm">
                      No notifications
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="text-right hidden md:block">
              <div className="text-sm font-bold text-white">
                {user.name}
              </div>
              <div className="text-xs text-slate-500">
                Verified User
              </div>
            </div>

            <button
              onClick={logout}
              className="text-slate-400 hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="py-16 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">
              Welcome back, {user.name.split(" ")[0]} 👋
            </h1>
            <p className="text-slate-400">
              Manage your academic conferences.
            </p>
          </div>

          <button
            onClick={onCreateConf}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3"
          >
            <Plus size={20} /> New Conference
          </button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto py-16 px-6">

        <div className="flex gap-10 mb-10 border-b border-white/5">
          <button
            onClick={() => setActiveTab("my")}
            className={`pb-4 text-sm font-bold uppercase tracking-widest ${
              activeTab === "my"
                ? "text-indigo-400"
                : "text-slate-500"
            }`}
          >
            My Conferences
          </button>

          <button
            onClick={() => setActiveTab("all")}
            className={`pb-4 text-sm font-bold uppercase tracking-widest ${
              activeTab === "all"
                ? "text-indigo-400"
                : "text-slate-500"
            }`}
          >
            Explore Events
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {activeTab === "my" ? (
            myConfs.length > 0 ? (
              myConfs.map((c) => (
                <ConfCard
                  key={c.id}
                  conf={c}
                  myRole={c.roles[user.id]}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-24 text-slate-500">
                No conferences found.
              </div>
            )
          ) : otherConfs.length > 0 ? (
            otherConfs.map((c) => (
              <ConfCard key={c.id} conf={c} />
            ))
          ) : (
            <div className="col-span-full text-center py-24 text-slate-500">
              No conferences found.
            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default UserDashboard;
