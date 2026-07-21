import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChapterList from "../components/project/ChapterList";
import ProjectHeader from "../components/project/ProjectHeader";
import CreateChapterModal from "../components/modals/CreateChapterModal";
import { useProjectStore } from "../store/projectStore";
import { useChapterStore } from "../store/chapterStore";
import { api, endpoints } from "../lib/api";
import type { Project } from "../types/project";

export default function ProjectOverview() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectError, setProjectError] = useState<string | null>(null);
  const [showCreateChapter, setShowCreateChapter] = useState(false);
  const { chapters, loading: chaptersLoading, fetchChapters, createChapter, deleteChapter } =
    useChapterStore();
  const { deleteProject } = useProjectStore();

  useEffect(() => {
    if (!projectId) return;
    setProjectLoading(true);
    api<Project>(endpoints.projects.get(projectId))
      .then((p) => {
        setProject(p);
        setProjectLoading(false);
      })
      .catch(() => {
        setProjectError("Project not found.");
        setProjectLoading(false);
      });
    fetchChapters(projectId);
  }, [projectId]);

  async function handleDeleteProject() {
    if (!projectId) return;
    await deleteProject(projectId);
    navigate("/");
  }

  async function handleCreateChapter(name: string) {
    if (!projectId) return;
    await createChapter(projectId, { name });
  }

  if (projectLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading…</p>
      </div>
    );
  }

  if (projectError || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-red-500">{projectError ?? "Something went wrong."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        <ProjectHeader project={project} onDelete={handleDeleteProject} />
        <ChapterList
          projectId={project.id}
          chapters={chapters}
          loading={chaptersLoading}
          onDelete={deleteChapter}
          onCreateClick={() => setShowCreateChapter(true)}
        />
      </div>
      {showCreateChapter && (
        <CreateChapterModal
          onConfirm={handleCreateChapter}
          onClose={() => setShowCreateChapter(false)}
        />
      )}
    </div>
  );
}
