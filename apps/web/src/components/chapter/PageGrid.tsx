import { useState } from "react";
import type { Page } from "../../types/page";

interface Props {
  pages: Page[];
  loading: boolean;
  onDelete: (id: string) => void;
  onCreateClick: () => void;
}

export default function PageGrid({ pages, loading, onDelete, onCreateClick }: Props) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  function handleDelete(id: string) {
    onDelete(id);
    setConfirmId(null);
  }

  if (loading) {
    return <p className="text-sm text-gray-400">Loading pages…</p>;
  }

  const sorted = pages.slice().sort((a, b) => a.pageNumber - b.pageNumber);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Pages</h2>
        <button
          onClick={onCreateClick}
          className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-700"
        >
          + New page
        </button>
      </div>
      {sorted.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-sm text-gray-400">No pages yet.</p>
          <button
            onClick={onCreateClick}
            className="mt-2 text-sm text-gray-600 underline hover:text-gray-900"
          >
            Create the first one
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {sorted.map((page) => (
            <div
              key={page.id}
              className="relative border border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50"
            >
              <p className="text-sm font-medium text-gray-800">Page {page.pageNumber}</p>
              {confirmId === page.id ? (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Delete?</span>
                  <button
                    onClick={() => handleDelete(page.id)}
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
                  onClick={() => setConfirmId(page.id)}
                  className="mt-2 text-xs text-gray-400 hover:text-red-500"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
