/* global console */

import csvToArray, { arrayToObject } from "./index.js";

const csv = `
COL1, COL2, NUM, MSG
Hello, World, 123, "Hello, World"
Hello, World, 123, " Hello,
""World"" "
`;

const array = csvToArray(csv);
const object = arrayToObject(array);
console.log(object);
