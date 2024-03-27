export interface AddBlockPayload {
  x: number,
  y: number,
  width: number,
  height: number,
  spriteId: string,
}

export interface DeleteBlockAtPayload {
  x: number,
  y: number,
}