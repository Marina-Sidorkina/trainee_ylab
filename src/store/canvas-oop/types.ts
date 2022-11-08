export interface ICanvasObject {
  type: string;
  x: number;
  y: number;
  color: string;
  mod: string;
}

export interface ICanvasState {
  objects: ICanvasObject[];
  input: {
    index: number;
    x: number;
    y: number;
  },
}
