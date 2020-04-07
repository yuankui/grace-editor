const Fastbitset = require('fastbitset');
const {BitSet} = require('bitset');
const byteBuffer = require('bytebuffer');

const bitset = new BitSet();
const fastbitset = new Fastbitset();

const randomInt = (max) => {
    const value = Math.random() * max;
    const int = parseInt(value.toString());
    return int;
};


for (let i = 0; i < 1000000; i++) {
    const bool = randomInt(100) % 2 === 0;
    if (bool) {
        bitset.set(i, 1);
        fastbitset.add(i);
    }
}

let buffer = byteBuffer.allocate(10);
bitset.data.forEach(num => {
    buffer.writeInt32(num);
});

buffer.offset = 0;

const array = [];

for (let i = 0; i < bitset.data.length; i++) {
    array.push(buffer.readInt32());
}

const bitset2 = new BitSet();
bitset2.data = array;

console.log(bitset.slice(0, 100).toArray());
console.log(bitset2.slice(0, 100).toArray());
