export const compass = {
    N: {
        L: "W",
        R: "E",
        move: (x, y) => {
            return { x: x, y: y + 1 };
        },
    },
    S: {
        L: "E",
        R: "W",
        move: (x, y) => {
            return { x: x, y: y - 1 };
        },
    },
    E: {
        L: "N",
        R: "S",
        move: (x, y) => {
            return { x: x + 1, y: y };
        },
    },
    W: {
        L: "S",
        R: "N",
        move: (x, y) => {
            return { x: x - 1, y: y };
        },
    },
};
export const rotations = ["L", "R"];
