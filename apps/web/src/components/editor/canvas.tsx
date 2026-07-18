const PAGE_WIDTH = 800;
const PAGE_HEIGHT = 1200;

export default function Canvas() {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-auto bg-slate-100 p-6">
      <div
        className="rounded-xl border border-slate-300 bg-white shadow-sm"
        style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-sm text-slate-500">
          Canvas preview ready
        </div>
      </div>
    </div>
  );
}