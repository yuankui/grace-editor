const {findSame} = require("./text-diff");

const same = findSame([1, 2, 3], [2, 3]);

console.log(same);