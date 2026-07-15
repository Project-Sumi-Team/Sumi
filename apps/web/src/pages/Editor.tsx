import Toolbar from "../components/editor/toolbar";
import Canvas from "../components/editor/canvas";

export default function Editor() {
  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      <main className="flex-1 overflow-hidden">
        <Canvas />
      </main>
    </div>
  );
}