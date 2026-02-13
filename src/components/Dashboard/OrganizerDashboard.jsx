import React, { useState, useMemo } from "react";
import {
  FileText,
  CheckCircle,
  XCircle,
  Users,
  Settings,
  Plus,
  Search,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const OrganizerDashboard = ({ conf }) => {
  const { papers, tasks, users, addTask, toggleTask } = useApp();

  const [newTask, setNewTask] = useState("");
  const [paperFilter, setPaperFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  /* ================= FILTER DATA ================= */

  const confPapers = useMemo(
    () => papers.filter((p) => p.confId === conf.id),
    [papers, conf.id]
  );

  const filteredPapers = useMemo(() => {
    return confPapers.filter((p) => {
      const matchesStatus =
        paperFilter === "all" ? true : p.status === paperFilter;

      const matchesSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [confPapers, paperFilter, search]);

  const confTasks = useMemo(
    () => tasks.filter((t) => t.confId === conf.id),
    [tasks, conf.id]
  );

  const pendingTasks = confTasks.filter((t) => t.status !== "done");
  const doneTasks = confTasks.filter((t) => t.status === "done");

  /* ================= TASK HANDLER ================= */

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    addTask({
      confId: conf.id,
      title: newTask,
      team: "general",
      status: "pending",
      assignee: "TBD",
    });

    setNewTask("");
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8 bg-[#0f1117] min-h-full">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Event Overview</h2>
          <p className="text-slate-500">Welcome back, Organizer.</p>
        </div>

        <button
          onClick={() => setShowSettings(true)}
          className="flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 px-4 py-2 rounded-xl font-medium hover:bg-white/10 transition-colors"
        >
          <Settings size={18} /> Settings
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Papers" value={confPapers.length} icon={FileText} />
        <StatCard
          label="Pending"
          value={confPapers.filter((p) => p.status === "pending").length}
          icon={Users}
        />
        <StatCard
          label="Accepted"
          value={confPapers.filter((p) => p.status === "accepted").length}
          icon={CheckCircle}
        />
        <StatCard
          label="Rejected"
          value={confPapers.filter((p) => p.status === "rejected").length}
          icon={XCircle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= PAPER MANAGEMENT ================= */}
        <div className="lg:col-span-2 bg-slate-900/50 rounded-3xl border border-white/5 overflow-hidden">

          <div className="px-8 py-6 border-b border-white/5 space-y-4">

            <h3 className="font-bold text-lg text-white">
              Paper Submissions
            </h3>

            {/* Filter Tabs */}
            <div className="flex gap-4 text-sm">
              {["all", "pending", "accepted", "rejected"].map((f) => (
                <button
                  key={f}
                  onClick={() => setPaperFilter(f)}
                  className={`uppercase font-bold ${
                    paperFilter === f
                      ? "text-indigo-400"
                      : "text-slate-500 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
              <Search size={16} className="text-slate-400" />
              <input
                placeholder="Search papers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm text-white w-full"
              />
            </div>

          </div>

          <div>
            {filteredPapers.length > 0 ? (
              filteredPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="p-6 border-b border-white/5 flex justify-between items-center hover:bg-white/5 transition"
                >
                  <div>
                    <div className="font-bold text-white">
                      {paper.title}
                    </div>
                    <div className="text-sm text-slate-500">
                      by{" "}
                      {users.find((u) => u.id === paper.authorId)?.name}
                    </div>
                  </div>

                  <span className="text-xs font-bold uppercase text-slate-400">
                    {paper.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-slate-500">
                No matching papers.
              </div>
            )}
          </div>
        </div>

        {/* ================= TASK MANAGEMENT ================= */}
        <div className="bg-slate-900/50 rounded-3xl border border-white/5 p-6 space-y-6">

          <h3 className="font-bold text-lg text-white">
            Team Tasks
          </h3>

          {/* Add Task */}
          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add task..."
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white"
            />
            <button className="bg-indigo-600 px-3 rounded-xl">
              <Plus size={18} />
            </button>
          </form>

          {/* Pending */}
          <div>
            <h4 className="text-xs uppercase text-slate-400 mb-2">
              Pending
            </h4>
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <TaskItem key={task.id} task={task} toggleTask={toggleTask} />
              ))
            ) : (
              <p className="text-sm text-slate-500">No pending tasks</p>
            )}
          </div>

          {/* Completed */}
          {doneTasks.length > 0 && (
            <div>
              <h4 className="text-xs uppercase text-slate-400 mt-4 mb-2">
                Completed
              </h4>
              {doneTasks.map((task) => (
                <TaskItem key={task.id} task={task} toggleTask={toggleTask} />
              ))}
            </div>
          )}

        </div>
      </div>

      {/* ================= SETTINGS MODAL ================= */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 w-[450px] space-y-6">
            <h3 className="text-xl font-bold text-white">
              Conference Settings
            </h3>

            <input
              defaultValue={conf.name}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white"
            />

            <input
              defaultValue={conf.date}
              type="date"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white"
            />

            <input
              defaultValue={conf.location}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowSettings(false)}
                className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg text-white font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

/* ================= COMPONENTS ================= */

const StatCard = ({ label, value, icon: Icon }) => (
  <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
    <Icon className="text-indigo-400 mb-3" size={22} />
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-xs uppercase text-slate-500">{label}</div>
  </div>
);

const TaskItem = ({ task, toggleTask }) => (
  <div
    onClick={() => toggleTask(task.id)}
    className="p-3 bg-black/30 rounded-xl text-sm text-slate-300 cursor-pointer hover:bg-black/50"
  >
    {task.title}
  </div>
);

export default OrganizerDashboard;
