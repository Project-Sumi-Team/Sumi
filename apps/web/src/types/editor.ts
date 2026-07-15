export type Tool =
  | "select"
  | "panel"
  | "bubble"
  | "text";

export interface BaseObject {
  id: string;

  x: number;
  y: number;

  width: number;
  height: number;

  rotation: number;
}

export interface PanelObject extends BaseObject {
  type: "panel";
}

export interface BubbleObject extends BaseObject {
  type: "bubble";

  text: string;

  fill: string;
  stroke: string;
}

export interface TextObject extends BaseObject {
  type: "text";

  text: string;

  fontSize: number;
  fontFamily: string;
  align: "left" | "center" | "right";
}

export type CanvasObject =
  | PanelObject
  | BubbleObject
  | TextObject;

export interface EditorPageData {
  objects: CanvasObject[];
}