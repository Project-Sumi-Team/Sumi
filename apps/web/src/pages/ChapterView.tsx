import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChapterHeader from "../components/chapter/ChapterHeader";
import PageGrid from "../components/chapter/PageGrid";
import CreatePageModal from "../components/modals/CreatePageModal";
import { useChapterStore } from "../store/chapterStore";
import { usePageStore } from "../store/pageStore";
import type { Chapter } from "../types/chapter.temp";

export default function ChapterView() {
  const { projectId, chapterId } = useParams<{ projectId: string; chapterId: string }>();

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreatePage, setShowCreatePage] = useState(false);

  const { chapters, fetchChapters } = useChapterStore();
  const { pages, loading: pagesLoading, fetchPages, createPage, deletePage } = usePageStore();

  useEffect(() => {
    if (!projectId || !chapterId) return;

    const cached = chapters.find((c) => c.id === chapterId);
    if (cached) {
      setChapter(cached);
      setLoading(false);
    } else {
      fetchChapters(projectId)
        .then(() => setLoading(false))
        .catch(() => { setError("Chapter not found."); setLoading(false); });
    }

    fetchPages(chapterId);
  }, [projectId, chapterId]);

  useEffect(() => {
    if (!chapterId) return;
    const found = chapters.find((c) => c.id === chapterId);
    if (found) { setChapter(found); setError(null); }
  }, [chapters, chapterId]);

  async function handleCreatePage(data: { order: number; width: number; height: number }) {
    if (!chapterId) return;
    await createPage(chapterId, data);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading…</p>
      </div>
    );
  }

  if (error || !chapter || !projectId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-red-500">{error ?? "Something went wrong."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        <ChapterHeader chapter={chapter} projectId={projectId} />
        <PageGrid
          pages={pages}
          loading={pagesLoading}
          onDelete={deletePage}
          onCreateClick={() => setShowCreatePage(true)}
        />
      </div>

      {showCreatePage && (
        <CreatePageModal
          chapterId={chapter.id}
          nextOrder={pages.length + 1}
          onConfirm={handleCreatePage}
          onClose={() => setShowCreatePage(false)}
        />
      )}
    </div>
  );
}
