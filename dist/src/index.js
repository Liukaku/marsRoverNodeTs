import * as readline from "readline";
import { createBounds, buildRovers, directionsArr, executeDirections, checkBounds, processOutput, } from "./utils/rover.utils.js";
//Main function
export default function operationStart(input) {
    const arrayOnlyHasStrings = input.every((item) => typeof item === "string");
    if (!arrayOnlyHasStrings)
        return "Input must be a string.";
    const plateauBounds = createBounds(input);
    const rovers = buildRovers(input);
    const directions = directionsArr(input);
    const movedRoversArr = [];
    //loop through each rover and execute directions
    for (let i = 0; i < directions.length; i++) {
        movedRoversArr.push(executeDirections(directions[i], rovers[i], movedRoversArr));
    }
    for (let n = 0; n < movedRoversArr.length; n++) {
        const inBounds = checkBounds(movedRoversArr[n], plateauBounds);
        if (!inBounds)
            throw "rover is out of bounds.";
    }
    const result = processOutput(movedRoversArr);
    return result;
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let input = [];
rl.setPrompt("Enter Instructions and type 'go' when ready: \n");
rl.prompt();
rl.on("line", function (cmd) {
    if (cmd.toUpperCase() === "GO")
        rl.close();
    input.push(cmd);
});
rl.on("close", function () {
    console.log(operationStart(input));
    process.exit(0);
});
