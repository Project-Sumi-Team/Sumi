import { useEditorStore } from "../../store/editorstore";

export default function PropertiesPanel() {
  const { objects, selectedObjectId } = useEditorStore();

  const selectedObject = objects.find(
    (obj) => obj.id === selectedObjectId
  );

  if (!selectedObject) {
    return (
      <aside className="w-64 border-l bg-white p-4">
        <h2 className="font-semibold mb-2">Properties</h2>
        <p className="text-sm text-gray-500">
          Select an object to edit its properties.
        </p>
      </aside>
    );
  }

  return (
    <aside className="w-64 border-l bg-white p-4">
      <h2 className="font-semibold mb-4">Properties</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium">X</label>
          <input
            type="number"
            value={selectedObject.x}
            className="w-full border rounded px-2 py-1"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Y</label>
          <input
            type="number"
            value={selectedObject.y}
            className="w-full border rounded px-2 py-1"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Width</label>
          <input
            type="number"
            value={selectedObject.width}
            className="w-full border rounded px-2 py-1"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Height</label>
          <input
            type="number"
            value={selectedObject.height}
            className="w-full border rounded px-2 py-1"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Rotation</label>
          <input
            type="number"
            value={selectedObject.rotation}
            className="w-full border rounded px-2 py-1"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Type</label>
          <input
            type="text"
            value={selectedObject.type}
            className="w-full border rounded px-2 py-1"
            readOnly
          />
        </div>
      </div>
    </aside>
  );
}