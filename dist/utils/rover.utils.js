import { rotations, compass } from "./constants.js";
//creates an array of rovers
export const buildRovers = (input) => {
    const rovers = [];
    for (let i = 1; i < input.length; i = i + 2) {
        rovers.push(createRover(input[i]));
    }
    return rovers;
};
//creates an array of directions
export const directionsArr = (input) => {
    const directions = [];
    for (let i = 1; i < input.length; i = i + 2) {
        directions.push(input[i + 1]);
    }
    return directions;
};
//processes the output to the correct format
export const processOutput = (rovers) => {
    let resultString = "";
    rovers.forEach((rover) => {
        resultString += `${rover.position.x} ${rover.position.y} ${rover.orientation}\n`;
    });
    return resultString;
};
export const createRover = (startPos) => {
    const filterPos = startPos.split("").filter((char) => char !== " ");
    const rover = {
        position: {
            x: parseInt(filterPos[0]),
            y: parseInt(filterPos[1]),
        },
        orientation: filterPos[2],
    };
    return rover;
};
export const executeDirections = (directions, rover, movedRoversArr) => {
    //create a copy of the rover so that the original is not modified
    const movedRover = JSON.parse(JSON.stringify(rover));
    directions.split("").forEach((directionLetter) => {
        const orientation = movedRover.orientation;
        if (rotations.includes(directionLetter)) {
            //rotate new rover objects according to current orientation
            movedRover.orientation =
                compass[orientation][directionLetter];
        }
        if (directionLetter === "M") {
            //move new rover objects according to current orientation
            movedRover.position = compass[orientation]["move"](movedRover.position.x, movedRover.position.y);
            //check for collisions
            checkForCollisions(movedRover.position.x, movedRover.position.y, movedRoversArr);
        }
    });
    return movedRover;
};
//establishes the bounds of the plateau
export const createBounds = (input) => {
    const bounds = { x: 0, y: 0 };
    const filterPos = input[0].split("").filter((char) => char !== " ");
    bounds.x = parseInt(filterPos[0]);
    bounds.y = parseInt(filterPos[1]);
    return bounds;
};
export const checkForCollisions = (x, y, movedRovers) => {
    if (movedRovers.length > 0) {
        for (let i = 0; i < movedRovers.length; i++) {
            if (movedRovers[i].position.x === x && movedRovers[i].position.y === y) {
                throw "collision detected with rover at position " + i;
            }
        }
    }
};
//check if rover is out of bounds
export const checkBounds = (movedRover, plateauBounds) => {
    if (movedRover.position.x > plateauBounds.x ||
        movedRover.position.x < 0 ||
        movedRover.position.y > plateauBounds.y ||
        movedRover.position.x < 0) {
        return false;
    }
    return true;
};
