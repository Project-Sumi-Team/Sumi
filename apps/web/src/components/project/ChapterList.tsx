import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Chapter } from "../../types/chapter";

interface Props {
  projectId: string;
  chapters: Chapter[];
  loading: boolean;
  onDelete: (id: string) => void;
  onCreateClick: () => void;
}

export default function ChapterList({ projectId, chapters, loading, onDelete, onCreateClick }: Props) {
  const navigate = useNavigate();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  function handleDelete(id: string) {
    onDelete(id);
    setConfirmId(null);
  }

  if (loading) {
    return <p className="text-sm text-gray-400">Loading chapters…</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Chapters</h2>
        <button
          onClick={onCreateClick}
          className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-700"
        >
          + New chapter
        </button>
      </div>
      {chapters.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-sm text-gray-400">No chapters yet.</p>
          <button
            onClick={onCreateClick}
            className="mt-2 text-sm text-gray-600 underline hover:text-gray-900"
          >
            Create the first one
          </button>
        </div>
      ) : (
        <ul className="space-y-2">
          {chapters
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((chapter) => (
              <li
                key={chapter.id}
                className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50"
              >
                <button
                  onClick={() => navigate(`/projects/${projectId}/chapters/${chapter.id}`)}
                  className="flex-1 text-left"
                >
                  <span className="text-sm font-medium text-gray-900">{chapter.name}</span>
                  <span className="ml-2 text-xs text-gray-400">#{chapter.order}</span>
                </button>
                {confirmId === chapter.id ? (
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-xs text-gray-500">Delete?</span>
                    <button
                      onClick={() => handleDelete(chapter.id)}
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
                    onClick={() => setConfirmId(chapter.id)}
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
  );
}
