import {test} from "mocha";
import {newSet} from "./Bitset";
import chai from 'chai';
import {from} from "rxjs";
import {toArray} from "rxjs/operators";

import assertArrays from 'chai-arrays';

chai.use(assertArrays);
chai.should();

test('bit-set-test', async function() {
    const value = [1, 3, 5, 6, 7, 9];
    const set = newSet();
    chai.should();
    value.forEach(value => {
            set.add(value);
        });

    let ints = await from(set)
        .pipe(
            toArray()
        )
        .toPromise();

    ints.should.to.be.equalTo(value);
});

test('and', async function() {
    const a = newSet([1,2,3,4]);
    const b = newSet([3, 4, 5, 6]);

    a.and(b);
    let ints = await from(a)
        .pipe(
            toArray()
        )
        .toPromise();

    ints.should.to.be.equalTo([3, 4]);
});

test('or', async function() {
    const a = newSet([1,2,3,4]);
    const b = newSet([3, 4, 5, 6]);

    a.or(b);
    let ints = await from(a)
        .pipe(
            toArray()
        )
        .toPromise();

    ints.should.to.be.equalTo([1, 2, 3, 4, 5, 6]);
});
