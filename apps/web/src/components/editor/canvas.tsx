import { Stage, Layer, Rect } from "react-konva";

const PAGE_WIDTH = 800;
const PAGE_HEIGHT = 1200;

export default function Canvas() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 overflow-auto">
      <Stage
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={PAGE_WIDTH}
            height={PAGE_HEIGHT}
            fill="white"
            stroke="black"
            strokeWidth={1}
          />
        </Layer>
      </Stage>
    </div>
  );
}