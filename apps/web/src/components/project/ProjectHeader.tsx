import { useState } from "react";
import type { Project } from "../../types/project.temp";

interface Props {
  project: Project;
  onDelete: () => void;
}

export default function ProjectHeader({ project, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
        {project.description && (
          <p className="mt-1 text-sm text-gray-500">{project.description}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Delete project
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Delete this project?</span>
            <button
              onClick={onDelete}
              className="text-sm text-red-600 font-medium hover:text-red-800"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {confirming && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setConfirming(false)}
        />
      )}
    </div>
  );
}
