import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../store/projectStore";

export default function Dashboard() {
  const navigate = useNavigate();
  const { projects, loading, error, fetchProjects, createProject, deleteProject } =
    useProjectStore();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      const project = await createProject({
        name: name.trim(),
        ...(description.trim() ? { description: description.trim() } : {}),
      });
      setName("");
      setDescription("");
      setShowForm(false);
      navigate(`/projects/${project.id}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-10 space-y-8 lg:px-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Workspace</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">Your projects</h1>
            <p className="mt-2 text-sm text-slate-600">Create a new project or reopen one you’ve been building.</p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            {showForm ? "Close" : "+ New project"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
              autoFocus
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !name.trim()}
                className="text-sm bg-gray-900 text-white px-4 py-1.5 rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                {submitting ? "Creating…" : "Create"}
              </button>
            </div>
          </form>
        )}

        {loading && <p className="text-sm text-slate-500">Loading your projects…</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && projects.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-medium text-slate-800">No projects yet</p>
            <p className="mt-2 text-sm text-slate-600">Start with a fresh idea and build your first manga project here.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-5 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Create your first project
            </button>
          </div>
        )}

        {projects.length > 0 && (
          <ul className="space-y-3">
            {projects.map((project) => (
              <li
                key={project.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:bg-slate-50"
              >
                <button
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="flex-1 text-left"
                >
                  <span className="text-sm font-medium text-gray-900">{project.name}</span>
                  {project.description && (
                    <span className="ml-2 text-xs text-gray-400">{project.description}</span>
                  )}
                </button>

                {confirmId === project.id ? (
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-xs text-gray-500">Delete?</span>
                    <button
                      onClick={() => { deleteProject(project.id); setConfirmId(null); }}
                      className="text-xs text-red-600 font-medium hover:text-red-800"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="text-xs text-gray-400 hover:text-gray-600"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmId(project.id)}
                    className="ml-4 text-xs text-gray-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
