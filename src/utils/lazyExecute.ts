export function lazyExecute<T extends Function>(func: T, time: number):T {
    let timer: any = null;
    const a: any = function () {
        const args: any = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, time);
    };
    return a;
}