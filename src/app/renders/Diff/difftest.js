const Diff = require('diff');

const a = `hello
hello
kitty
kitty2`;

const b = `hello
hello
kitty1
kitty3`;

const changes = Diff.diffLines(a, b);

console.log(changes);

console.log(changes.filter(c => c.added !== true));
console.log(changes.filter(c => c.removed !== true));

const res = changes.filter(c => c.added !== true)
    .map(c => {
        if (c.removed) {
            return c.value.toUpperCase();
        }
        return c.value;
    })
    .join("");


console.log(res);

const res2 = changes.filter(c => c.removed !== true)
    .map(c => {
        if (c.added) {
            return c.value.toUpperCase();
        }
        return c.value;
    })
    .join("");


console.log(res2);