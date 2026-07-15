interface ProjectCardProps {
  id: string;
  title: string;
  chapters: number;
  updatedAt: string;
}

export default function ProjectCard({
  id,
  title,
  chapters,
  updatedAt,
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-2">
        {title}
      </h2>

      <p className="text-gray-600 mb-1">
        Chapters: {chapters}
      </p>

      <p className="text-gray-500 text-sm mb-4">
        Updated {updatedAt}
      </p>

      <a
        href={`/project/${id}`}
        className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        Open Project
      </a>
    </div>
  );
}