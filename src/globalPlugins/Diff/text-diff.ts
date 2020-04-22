/**
 *
 * @param list1
 * @param list2
 *
 * @return [[pos1, pos2], [pos1, pos2]] 表示list1中的pos1月list2中的pos2匹配
 *
 */

export function findSame<T>(list1: Array<T>, list2: Array<T>): Array<[number, number]> {
    // f(i,j) => array<number, number>
    const f: Array<Array<Array<[number, number]>>> = list1.map(() => list2.map(() => []));

    for (let i = 0; i < list1.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            const a = list1[i];
            const b = list2[j];

            // 1. 计算f(i,j) = max(f(i-1,j), f(i,j-1), f(i-1,j-1) + value(i,j))

            // 1.1 f(i-1,j)
            if (i - 1 >= 0 && f[i - 1][j].length > f[i][j].length) {
                f[i][j] = f[i - 1][j];
            }

            // 1.2 f(i,j-1)
            if (j - 1 >= 0 && f[i][j - 1].length > f[i][j].length) {
                f[i][j] = f[i][j - 1];
            }

            // 1.3 计算value(i,j)
            if (a == b) {
                if (i - 1 >= 0 && j - 1 >= 0) {
                    if (f[i - 1][j - 1].length + 1 > f[i][j].length) {
                        f[i][j] = [...f[i - 1][j - 1], [i, j]];
                    }
                } else {
                    f[i][j] = [[i, j]];
                }

            }

            console.log(i, j, f);
        }
    }

    return f[list1.length - 1][list2.length - 1];
}

export interface Change<T> {
    type: "same" | "add" | "remove",
    left?: number,
    right?: number,
    value: T,
}

export function findDiff<T>(a: Array<T>, b: Array<T>): Array<Change<T>> {
    const same = findSame(a, b);
    let [lastLeft, lastRight] = same[0];

    for (let [leftIndex, rightIndex] of same) {
        const accLeft = leftIndex - lastLeft;
        const accRight = rightIndex - lastRight;

    }
    return [];
}