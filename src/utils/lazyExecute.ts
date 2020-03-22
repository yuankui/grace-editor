export function lazyExecute(func: any, time: number) {
    let timer: any = null;
    return function() {
        const args: any = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, time);
    }
}