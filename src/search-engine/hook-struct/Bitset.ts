import {RoaringBitmap32} from "roaring";
import BitSet from "bitset/bitset";

export interface Bitset extends Iterable<number>{
    and(other: Bitset): Bitset;
    or(other: Bitset): Bitset;
    andNot(other: Bitset): Bitset;
    clone(): Bitset;
}

class BitsetImpl implements Bitset {
    [Symbol.iterator](): Iterator<number> {
        return undefined;
    }

    and(other: Bitset): Bitset {
        return undefined;
    }

    andNot(other: Bitset): Bitset {
        return undefined;
    }

    clone(): Bitset {
        return undefined;
    }

    or(other: Bitset): Bitset {
        return undefined;
    }

}
export function emptySet(): Bitset {
    return new BitsetImpl();
}

const bitmap: RoaringBitmap32 = new RoaringBitmap32();

bitmap.clone()