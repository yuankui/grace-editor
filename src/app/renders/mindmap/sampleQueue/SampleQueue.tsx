import mitt from 'mitt';
import {Observable} from "rxjs";

export interface Listener<T> {
    (message: T): void,
}

export interface MessageQueue<T> {
    on(listener: Listener<T>);
    emit(message: T);
}

const name = 'message';

function toMessageQueue<T>(emitter: mitt.Emitter): MessageQueue<T> {
    return {
        emit(message: T) {
            emitter.emit(name, message);
        },
        on(listener: Listener<T>) {
            emitter.on(name, listener);
        }
    }
}

interface Close {
    (): void,
}
export function createSampleQueue<T>(interval: number): [MessageQueue<T>, MessageQueue<T>, Close] {
    const input = toMessageQueue<T>(mitt());
    const output = toMessageQueue<T>(mitt());

    let timer: NodeJS.Timeout | null = null;
    new Observable<T>(subscriber => {
        let cache: T | null = null;
        input.on(message => {
            cache = message;
        })

        timer = setInterval(() => {
            if (cache != null) {
                subscriber.next(cache);
                cache = null;
            }
        }, interval)
    })
        .subscribe(value => {
            output.emit(value);
        })

    const close: Close = () => {
        if (timer)
            clearInterval(timer);
    }

    return [input, output, close];
}