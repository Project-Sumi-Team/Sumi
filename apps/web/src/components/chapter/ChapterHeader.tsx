import { useNavigate } from "react-router-dom";
import type { Chapter } from "../../types/chapter";

interface Props {
  chapter: Chapter;
  projectId: string;
}

export default function ChapterHeader({ chapter, projectId }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => navigate(`/projects/${projectId}`)}
        className="text-sm text-gray-400 hover:text-gray-700"
      >
        ← Back
      </button>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{chapter.name}</h1>
        <p className="text-xs text-gray-400 mt-0.5">Chapter {chapter.order}</p>
      </div>
    </div>
  );
}
