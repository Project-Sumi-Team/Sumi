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
      </Routes>
    </BrowserRouter>
  );
}
