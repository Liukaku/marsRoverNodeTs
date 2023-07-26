export interface Coords {
  x: number;
  y: number;
}

export interface Rover {
  position: {
    x: number;
    y: number;
  };
  orientation: string;
}

export interface Compass {
  [key: string]: CompassObject;
}

interface CompassObject {
  L: string;
  R: string;
  move: (x: number, y: number) => Coords;
}

export type DirectionLetter = "L" | "R";
