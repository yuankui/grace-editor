import {RoaringBitmap32} from "roaring";

export interface Bitset extends Iterable<number>{
    and(other: Bitset): Bitset;
    or(other: Bitset): Bitset;
    andNot(other: Bitset): Bitset;
    clone(): Bitset;
    add(num: number): Bitset;
    remove(num: number): Bitset;
}

class BitsetImpl implements Bitset {
    private bitmap: RoaringBitmap32;

    constructor(bitmap: RoaringBitmap32) {
        this.bitmap = bitmap;
    }

    [Symbol.iterator](): Iterator<number> {
        return this.bitmap.iterator();
    }

    and(other: Bitset): Bitset {
        const that = other as BitsetImpl;
        this.bitmap.andInPlace(that.bitmap);
        return this;
    }

    andNot(other: Bitset): Bitset {
        const that = other as BitsetImpl;
        this.bitmap.andNotInPlace(that.bitmap);
        return this;
    }

    clone(): Bitset {
        return new BitsetImpl(this.bitmap.clone());
    }

    or(other: Bitset): Bitset {
        const that = other as BitsetImpl;
        this.bitmap.orInPlace(that.bitmap);
        return this;
    }

    add(num: number): Bitset {
        this.bitmap.add(num);
        return this;
    }

    remove(num: number): Bitset {
        this.bitmap.remove(num);
        return this;
    }

}
export function emptySet(): Bitset {
    return new BitsetImpl(new RoaringBitmap32());
}

export function newSet(numbers?: Iterable<number>): Bitset {
    return new BitsetImpl(new RoaringBitmap32(numbers));
}