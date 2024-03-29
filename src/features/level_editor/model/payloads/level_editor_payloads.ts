export interface AddBlockPayload {
  x: number,
  y: number,
  width: number,
  height: number,
  spriteId: string,
}

export interface FillBlockPayload {
  width: number,
  height: number,
  spriteId: string,
}

export interface CoordinatePayload {
  x: number,
  y: number,
}

export interface ChangeSelectionPayload {
  createNew: boolean,
  coords: CoordinatePayload,
}