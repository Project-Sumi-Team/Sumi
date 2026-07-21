<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectOverview from "./pages/ProjectOverview";
import ChapterView from "./pages/ChapterView";
import Editor from "./pages/Editor";
import Account from "./pages/Account";
import { getToken } from "./lib/auth";

function App() {
  const token = getToken();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/dashboard" replace /> : <Register />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/projects/:projectId"
          element={
            token ? (
              <ProjectOverview />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/chapters/:chapterId"
          element={
            token ? (
              <ChapterView />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/editor/:pageId"
          element={
            token ? (
              <Editor />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/account"
          element={token ? <Account /> : <Navigate to="/login" replace />}
        />

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProjectOverview from "./pages/ProjectOverview";
import ChapterView from "./pages/ChapterView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects/:projectId" element={<ProjectOverview />} />
        <Route path="/projects/:projectId/chapters/:chapterId" element={<ChapterView />} />
>>>>>>> origin/dorito/ui-foundation
      </Routes>
    </BrowserRouter>
  );
}
<<<<<<< HEAD

export default App;
=======
>>>>>>> origin/dorito/ui-foundation
