import { useEditorStore } from "../../store/editorstore";

export default function Toolbar() {
  const { selectedTool, setTool } = useEditorStore();

  const toolClass = (tool: string) =>
    `px-3 py-1 rounded border ${
      selectedTool === tool ? "bg-black text-white" : "bg-white"
    }`;

  return (
    <header className="h-14 border-b flex items-center gap-2 px-4 bg-white">
      <button
        onClick={() => setTool("select")}
        className={toolClass("select")}
      >
        Select
      </button>

      <button
        onClick={() => setTool("panel")}
        className={toolClass("panel")}
      >
        Panel
      </button>

      <button
        onClick={() => setTool("bubble")}
        className={toolClass("bubble")}
      >
        Bubble
      </button>

      <button
        onClick={() => setTool("text")}
        className={toolClass("text")}
      >
        Text
      </button>

      <div className="ml-auto flex gap-2">
        <button className="px-3 py-1 border rounded">
          Save
        </button>

        <button className="px-3 py-1 border rounded">
          Export PNG
        </button>
      </div>
    </header>
  );
}