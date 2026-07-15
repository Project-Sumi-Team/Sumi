import { createBrowserRouter } from "react-router-dom";

import Landing from "../pages/Landing.tsx";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProjectOverview from "../pages/ProjectOverview";
import ChapterView from "../pages/ChapterView";
import Editor from "../pages/Editor";
import Account from "../pages/Account";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/project/:projectId",
    element: <ProjectOverview />,
  },
  {
    path: "/chapter/:chapterId",
    element: <ChapterView />,
  },
  {
    path: "/editor/:pageId",
    element: <Editor />,
  },
  {
    path: "/account",
    element: <Account />,
  },
]);