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
    description:
      "The premier conference for AI safety and future tech.",
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

  /* ================= AUTH ================= */

  const login = useCallback(
    (email, password) => {
      const found = users.find(
        (u) => u.email === email && u.password === password
      );
      if (found) setUser(found);
      return !!found;
    },
    [users]
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const register = useCallback(
    (name, email, password) => {
      if (users.some((u) => u.email === email)) return false;

      const newUser = {
        id: `u${Date.now()}`,
        name,
        email,
        password,
      };

      setUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      return true;
    },
    [users]
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
    },
    [user]
  );

  const getUserRole = useCallback(
    (conf) => {
      if (!conf?.roles || !user) return null;
      return conf.roles[user.id] || null;
    },
    [user]
  );

  /* ================= PAPERS ================= */

  const addPaper = useCallback((paper) => {
    setPapers((prev) => [...prev, { ...paper, id: `p${Date.now()}` }]);
  }, []);

  const updatePaperStatus = useCallback((id, status, score = null) => {
    setPapers((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status, reviewScore: score } : p
      )
    );
  }, []);

  /* ================= TASKS ================= */

  const addTask = useCallback((task) => {
    setTasks((prev) => [...prev, { ...task, id: `t${Date.now()}` }]);
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "done" ? "pending" : "done" }
          : t
      )
    );
  }, []);

  /* ================= MEMOIZED VALUE ================= */

  const value = useMemo(
    () => ({
      user,
      users,
      conferences,
      papers,
      tasks,
      login,
      logout,
      register,
      createConference,
      getUserRole,
      addPaper,
      updatePaperStatus,
      addTask,
      toggleTask,
    }),
    [
      user,
      users,
      conferences,
      papers,
      tasks,
      login,
      logout,
      register,
      createConference,
      getUserRole,
      addPaper,
      updatePaperStatus,
      addTask,
      toggleTask,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
