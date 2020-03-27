import mitt from 'mitt'
import {useEffect} from "react";

const emitter = mitt();

export function useMessage<T>(topic: string, consumer: Consumer<T>) {
    useEffect(() => {
        emitter.on(topic, consumer);
        return () => {
            emitter.off(topic, consumer);
        }
    })
}

export function useLazyMessage<T>(topic: string): Consumer<Consumer<T>> {
    let consumer: Consumer<T> | null = null;

    const consumerConsumer = c => {
        consumer = c;
    };

    useEffect(() => {
        emitter.on(topic, event => {
            if (consumer != null) {
                consumer(event);
            }
        })
    });

    return consumerConsumer;
}

export interface RefMessageConsumer<Ref, Data> {
    (ref: Ref, data: Data): void,
}

export interface RefConsumer<Ref> {
    (ref: Ref): void,
}

export function useRefMessage<Data, Ref>(topic: string, refMessageConsumer: RefMessageConsumer<Data, Ref>): RefConsumer<Ref> {
    let ref: any = null;

    const refConsumer: RefConsumer<Ref> = r => {
        ref = r;
    };


    useEffect(() => {
        emitter.on(topic, data => {
            if (ref != null) {
                refMessageConsumer(ref, data);
            }
        })
    });
    return refConsumer;
}

export function notify(topic: string, data?: any) {
    emitter.emit(topic, data);
}

export interface Consumer<T> {
    (data: T): void,
}