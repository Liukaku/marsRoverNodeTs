import operationStart from "../index.js";
import {
  createBounds,
  buildRovers,
  executeDirections,
  checkBounds,
  checkForCollisions,
  createRover,
} from "../utils/rover.utils.js";

const oneRover = ["5 5", "1 2 N", "LMLMLMLMM"];
const twoRovers = ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"];

describe("tests that the main function runs correctly", () => {
  test("it returns the expected output for one rover", () => {
    expect(operationStart(oneRover)).toBe("1 3 N\n");
  });

  test("the input returns expected output for two rovers", () => {
    expect(operationStart(twoRovers)).toBe("1 3 N\n5 1 E\n");
  });
});

describe("tests to check the builder functions handle given arrays", () => {
  test("it establishes bounds with the given keys", () => {
    expect(createBounds(oneRover)).toEqual({
      x: 5,
      y: 5,
    });
  });

  test("it returns an array with the correct number of rovers", () => {
    expect(buildRovers(twoRovers)).toHaveLength(2);
  });
});

describe("create rover object from input and converts to numbers", () => {
  test("it creates rover object correcty property", () => {
    expect(createRover("1 2 N")).toEqual({
      position: { x: 1, y: 2 },
      orientation: "N",
    });
  });
});

describe("checks for failures like collisions and out of bounds", () => {
  test("checks for collisions", () => {
    const runCollision = () => {
      checkForCollisions(1, 3, [{ position: { x: 1, y: 3 } }]);
    };
    expect(runCollision).toThrow();
  });

  test("it returns false when out of bounds", () => {
    expect(checkBounds({ position: { x: 5, y: 6 } }, { x: 5, y: 5 })).toBe(
      false
    );
  });

  test("it returns true when rover is in bounds", () => {
    expect(checkBounds({ position: { x: 3, y: 3 } }, { x: 5, y: 5 })).toBe(
      true
    );
  });
});

describe("tests that execute directions and outputs the final position of the rover", () => {
  test("it should not modify original rover", () => {
    const rover = { position: { x: 1, y: 2 }, orientation: "N" };
    executeDirections("LMLMLMLMM", rover, []);
    expect(rover).toEqual(rover);
  });

  test("it rotates the rover correctly", () => {
    const rover = { position: { x: 1, y: 2 }, orientation: "N" };
    expect(executeDirections("L", rover, [])).toEqual({
      position: { x: 1, y: 2 },
      orientation: "W",
    });
    expect(executeDirections("R", rover, [])).toEqual({
      position: { x: 1, y: 2 },
      orientation: "E",
    });
  });

  test("it moves the rover forward by their current orientation", () => {
    const rover = { position: { x: 1, y: 2 }, orientation: "N" };
    expect(executeDirections("M", rover, [])).toEqual({
      position: { x: 1, y: 3 },
      orientation: "N",
    });
  });
});

describe("tests that handle bad input", () => {
  test("it returns error when input is not a string", () => {
    expect(
      operationStart([
        1 as unknown as string,
        2 as unknown as string,
        3 as unknown as string,
      ])
    ).toEqual("Input must be a string.");
  });

  test("it doesn't execute bad input directions", () => {
    expect(operationStart(["5 5", "1 2 N", "LMLMLMLMM"])).toEqual("1 3 N\n");
  });

  test("it doesn't execute bad input directions", () => {
    expect(operationStart(["5 5", "1 2 N", "PPPAPAPPAPAPPA"])).toEqual(
      "1 2 N\n"
    );
  });
});
