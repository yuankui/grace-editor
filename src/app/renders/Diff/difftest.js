const Diff = require('diff');

const a = `hello kitty
this is yuankui,
how are your sister
hello
`;

const b = `hello kitty
this is wangfang
show are you
ww
hello`;

const changes = Diff.diffWordsWithSpace(a, b);

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