import mitt from 'mitt'
import {useEffect} from "react";
import {Consumer} from "../../common";

const emitter = mitt();

export function useMessage<T>(topic: MessageTopic, consumer: Consumer<T>) {
    useEffect(() => {
        emitter.on(topic, consumer);
        return () => {
            emitter.off(topic, consumer);
        }
    }, []);
}

export function useLazyMessage<T>(topic: MessageTopic): Consumer<Consumer<T>> {
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

export function useRefMessage<Data, Ref>(topic: MessageTopic, refMessageConsumer: RefMessageConsumer<Ref, Data>): RefConsumer<Ref> {
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

export type MessageTopic = "codemirror-focus"
    | "title-enter"
    | "locate-post"
    ;

export function notify(topic: MessageTopic, data?: any) {
    emitter.emit(topic, data);
}
