import { Compass } from "./types.js";

export const compass: Compass = {
  N: {
    L: "W",
    R: "E",
    move: (x: number, y: any) => {
      return { x: x, y: y + 1 };
    },
  },
  S: {
    L: "E",
    R: "W",
    move: (x: any, y: number) => {
      return { x: x, y: y - 1 };
    },
  },
  E: {
    L: "N",
    R: "S",
    move: (x: number, y: any) => {
      return { x: x + 1, y: y };
    },
  },
  W: {
    L: "S",
    R: "N",
    move: (x: number, y: any) => {
      return { x: x - 1, y: y };
    },
  },
};

export const rotations = ["L", "R"];
