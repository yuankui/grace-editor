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

export function notify(topic: string, data?: any) {
    emitter.emit(topic, data);
}

export interface Consumer<T> {
    (data: T): void,
}