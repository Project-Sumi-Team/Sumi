import { useState } from "react";

import ProjectCard from "../components/project/projectcard";
import SearchBar from "../components/project/searchbar";
import CreateProjectModal from "../components/project/createprojectmodal";

interface Project {
  id: string;
  title: string;
  chapters: number;
  updatedAt: string;
}

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] =
    useState(false);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Project Sumi",
      chapters: 5,
      updatedAt: "Today",
    },
    {
      id: "2",
      title: "Fantasy Manga",
      chapters: 2,
      updatedAt: "Yesterday",
    },
    {
      id: "3",
      title: "Sci-Fi Story",
      chapters: 8,
      updatedAt: "3 days ago",
    },
  ]);

  const filteredProjects = projects.filter((project) =>
    project.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleCreateProject = (
    title: string,
    description: string
  ) => {
    const newProject: Project = {
      id: Date.now().toString(),
      title,
      chapters: 0,
      updatedAt: "Just now",
    };

    console.log("Creating Project:", {
      ...newProject,
      description,
    });

    setProjects((prev) => [newProject, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Sumi
          </h1>

          <a
            href="/account"
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Account
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            Your Projects
          </h2>

          <p className="text-gray-600 mt-1">
            Create, manage, and organize your manga projects.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search projects..."
          />

          <button
            onClick={() =>
              setIsCreateModalOpen(true)
            }
            className="px-6 py-2 bg-black text-white rounded-lg hover:opacity-90"
          >
            + Create Project
          </button>
        </div>

        {/* Projects */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                chapters={project.chapters}
                updatedAt={project.updatedAt}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border rounded-xl p-12 text-center">
            <h3 className="text-xl font-semibold mb-2">
              No projects found
            </h3>

            <p className="text-gray-600">
              Try another search term or create a
              new project.
            </p>
          </div>
        )}
      </main>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() =>
          setIsCreateModalOpen(false)
        }
        onCreate={handleCreateProject}
      />
    </div>
  );
}