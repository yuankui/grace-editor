import {useMemo} from "react";

class History<T> {
    private readonly stack: T[];
    private currentPointer: number;
    private readonly capacity: number;

    constructor(stack: T[], capacity: number = 20) {
        this.stack = stack;
        this.currentPointer = 0;
        this.capacity = capacity;
    }

    private debug() {
        console.log('history', this.currentPointer, this.stack);
    }
    push(item: T) {
        while (this.stack[this.currentPointer + 1] != null) {
            this.stack.pop();
        }
        this.stack.push(item);
        this.currentPointer = this.currentPointer + 1;
        while (this.stack.length > this.capacity) {
            this.stack.shift();
            this.currentPointer = this.currentPointer - 1;
        }

        this.debug();
    }

    pop(callback: (item: T) => void) {
        if (this.currentPointer == 0) {
            return;
        }
        let prev = this.stack[this.currentPointer - 1];
        if (prev != null) {
            this.currentPointer = this.currentPointer - 1;
            callback(prev);
        }
        this.debug();
    }

    // 回复历史
    forward(callback: (item: T) => void) {
        let next = this.stack[this.currentPointer + 1];
        if (next != null) {
            this.currentPointer = this.currentPointer + 1;
            callback(next);
        }
    }

    entries() {
        return this.stack;
    }
}

export function useHistory<T>(initial: T, size: number = 20) {
    return useMemo<History<T>>(() => new History([initial], size), []);
}