import React, { createContext, useState, useContext } from 'react';

const INITIAL_USERS = [
  { id: 'u1', name: 'Dr. Alice Admin', email: 'alice@test.com', password: '123' },
  { id: 'u2', name: 'Bob Reviewer', email: 'bob@test.com', password: '123' },
  { id: 'u3', name: 'Charlie Presenter', email: 'charlie@test.com', password: '123' },
];

const INITIAL_CONFERENCES = [
  {
    id: 'c1',
    name: 'Global AI Summit 2024',
    theme: 'Artificial Intelligence & Ethics',
    location: 'San Francisco, CA',
    date: '2024-10-15',
    description: 'The premier conference for AI safety and future tech. Join the worlds leading experts as we discuss the future of humanity.',
    organizerId: 'u1',
    template: 'modern',
    banner: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=2000',
    roles: {
      'u1': 'organizer',
      'u2': 'reviewer',
      'u3': 'presenter'
    }
  },
  {
    id: 'c2',
    name: 'Oceanography Futures',
    theme: 'Marine Biology',
    location: 'Lisbon, Portugal',
    date: '2024-11-20',
    description: 'Exploring the depths of our oceans and preserving marine life for future generations.',
    organizerId: 'u2',
    template: 'classic',
    banner: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=2000',
    roles: {
      'u2': 'organizer',
      'u1': 'attendee'
    }
  },
  {
    id: 'c3',
    name: 'Design Systems 2024',
    theme: 'UI/UX & Design Ops',
    location: 'Berlin, Germany',
    date: '2024-12-05',
    description: 'A deep dive into atomic design, tokens, and scalable UI architectures.',
    organizerId: 'u3',
    template: 'minimal',
    banner: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2000',
    roles: {}
  }
];

const INITIAL_PAPERS = [
  { 
    id: 'p1', 
    confId: 'c1', 
    title: 'Neural Nets in 2025', 
    authorId: 'u3', 
    status: 'pending', 
    file: 'draft.pdf', 
    reviewScore: null 
  },
];

const INITIAL_TASKS = [
  { 
    id: 't1', 
    confId: 'c1', 
    title: 'Book Keynote Speaker', 
    team: 'logistics', 
    status: 'pending', 
    assignee: 'u1' 
  },
  { 
    id: 't2', 
    confId: 'c1', 
    title: 'Finalize Schedule', 
    team: 'programming', 
    status: 'done', 
    assignee: 'u1' 
  },
];

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [conferences, setConferences] = useState(INITIAL_CONFERENCES);
  const [papers, setPapers] = useState(INITIAL_PAPERS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const login = (email, pass) => {
    const found = users.find(u => u.email === email && u.password === pass);
    if (found) setUser(found);
    return !!found;
  };

  const logout = () => setUser(null);

  const register = (name, email, pass) => {
    const newUser = { 
      id: `u${users.length + 1}`, 
      name, 
      email, 
      password: pass 
    };
    setUsers([...users, newUser]);
    setUser(newUser);
  };

  const createConference = (data) => {
    const newConf = {
      ...data,
      id: `c${conferences.length + 1}`,
      organizerId: user.id,
      roles: { [user.id]: 'organizer' }
    };
    setConferences([...conferences, newConf]);
  };

  const addPaper = (paper) => setPapers([...papers, paper]);
  
  const updatePaperStatus = (id, status, score) => {
    setPapers(papers.map(p => 
      p.id === id ? { ...p, status, reviewScore: score } : p
    ));
  };

  const addTask = (task) => setTasks([...tasks, task]);
  
  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t
    ));
  };

  const value = {
    user,
    users,
    conferences,
    papers,
    tasks,
    login,
    logout,
    register,
    createConference,
    addPaper,
    updatePaperStatus,
    addTask,
    toggleTask
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
