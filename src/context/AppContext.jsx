import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";

/* ================= INITIAL DATA ================= */

const INITIAL_USERS = [
  { id: "u1", name: "Dr. Alice Admin", email: "alice@test.com", password: "123" },
  { id: "u2", name: "Bob Reviewer", email: "bob@test.com", password: "123" },
  { id: "u3", name: "Charlie Presenter", email: "charlie@test.com", password: "123" },
];

const INITIAL_CONFERENCES = [
  {
    id: "c1",
    name: "Global AI Summit 2024",
    theme: "Artificial Intelligence & Ethics",
    location: "San Francisco, CA",
    date: "2024-10-15",
    description: "The premier conference for AI safety and future tech.",
    organizerId: "u1",
    template: "modern",
    banner:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=2000",
    roles: {
      u1: "organizer",
      u2: "reviewer",
      u3: "presenter",
    },
  },
];

const INITIAL_PAPERS = [
  {
    id: "p1",
    confId: "c1",
    title: "Neural Nets in 2025",
    authorId: "u3",
    status: "pending",
    file: "draft.pdf",
    reviewScore: null,
  },
];

const INITIAL_TASKS = [
  {
    id: "t1",
    confId: "c1",
    title: "Book Keynote Speaker",
    team: "logistics",
    status: "pending",
    assignee: "u1",
  },
];

/* ================= CONTEXT ================= */

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [conferences, setConferences] = useState(INITIAL_CONFERENCES);
  const [papers, setPapers] = useState(INITIAL_PAPERS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [notifications, setNotifications] = useState([]);

  /* ================= TOAST SYSTEM ================= */

  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type, duration }]);

   // 🔊 Safe sound playback
try {
  const audio = new Audio(
    type === "error"
      ? "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
      : "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
  );

  audio.volume = 0.4;

  audio.play().catch(() => {
    // silently ignore autoplay errors
  });
} catch (err) {
  console.log("Sound not supported");
}


    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  /* ================= NOTIFICATIONS ================= */

  const addNotification = useCallback((userId, message) => {
    setNotifications((prev) => [
      ...prev,
      { id: `n${Date.now()}`, userId, message, read: false },
    ]);
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  /* ================= AUTH ================= */

  const login = useCallback(
    (email, password) => {
      const found = users.find(
        (u) => u.email === email && u.password === password
      );
      if (found) {
        setUser(found);
        showToast("Login successful!", "success");
      }
      return !!found;
    },
    [users, showToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    showToast("Logged out successfully", "info");
  }, [showToast]);

  const register = useCallback(
    (name, email, password) => {
      if (users.some((u) => u.email === email)) {
        showToast("Email already exists", "error");
        return false;
      }

      const newUser = {
        id: `u${Date.now()}`,
        name,
        email,
        password,
      };

      setUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      showToast("Account created successfully!", "success");

      return true;
    },
    [users, showToast]
  );

  /* ================= CONFERENCE ================= */

  const createConference = useCallback(
    (data) => {
      if (!user) return;

      const newConf = {
        ...data,
        id: `c${Date.now()}`,
        organizerId: user.id,
        roles: { [user.id]: "organizer" },
      };

      setConferences((prev) => [...prev, newConf]);

      addNotification(user.id, `Conference "${data.name}" created.`);
      showToast("Conference created!", "success");
    },
    [user, addNotification, showToast]
  );

  const getUserRole = useCallback(
    (conf) => {
      if (!conf?.roles || !user) return null;
      return conf.roles[user.id] || null;
    },
    [user]
  );

  /* ================= PAPERS ================= */

  const addPaper = useCallback(
    (paper) => {
      const newPaper = {
        ...paper,
        id: `p${Date.now()}`,
      };

      setPapers((prev) => [...prev, newPaper]);

      addNotification(
        paper.authorId,
        `Your paper "${paper.title}" submitted.`
      );
      showToast("Paper submitted!", "success");
    },
    [addNotification, showToast]
  );

  const updatePaperStatus = useCallback(
    (id, status, score = null, feedback = "") => {
      setPapers((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                status,
                reviewScore: score,
                feedback,
                reviewedAt: new Date().toISOString(),
              }
            : p
        )
      );

      const paper = papers.find((p) => p.id === id);

      if (paper) {
        addNotification(
          paper.authorId,
          `Your paper "${paper.title}" was ${status}.`
        );
        showToast(
          `Paper ${status}`,
          status === "accepted" ? "success" : "error"
        );
      }
    },
    [papers, addNotification, showToast]
  );

  /* ================= TASKS ================= */

  const addTask = useCallback(
    (task) => {
      setTasks((prev) => [...prev, { ...task, id: `t${Date.now()}` }]);
      showToast("Task added!", "success");
    },
    [showToast]
  );

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "done" ? "pending" : "done" }
          : t
      )
    );
  }, []);

  /* ================= VALUE ================= */

  const value = useMemo(
    () => ({
      user,
      users,
      conferences,
      papers,
      tasks,
      notifications,
      toasts,
      login,
      logout,
      register,
      createConference,
      getUserRole,
      addPaper,
      updatePaperStatus,
      addTask,
      toggleTask,
      addNotification,
      markNotificationRead,
      showToast,
    }),
    [
      user,
      users,
      conferences,
      papers,
      tasks,
      notifications,
      toasts,
      login,
      logout,
      register,
      createConference,
      getUserRole,
      addPaper,
      updatePaperStatus,
      addTask,
      toggleTask,
      addNotification,
      markNotificationRead,
      showToast,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
