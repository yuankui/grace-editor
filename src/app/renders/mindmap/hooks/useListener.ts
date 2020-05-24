import {useCallback, useEffect} from "react";
import mitt from 'mitt';

const mq = mitt();

export type EventType = "NodeDoubleClick"
    | "NodeClick"
    | "BoardClick"
    | "DeleteNode"
    | "InsertChild"
    | "EditNode"
    | "MoveUp"
    | "MoveDown"
    | "MoveLeft"
    | "MoveRight"
    | "ExpandOn"
    | "ExpandOff"
    | "InsertSibling";

export interface EventConsumer {
    (type: EventType, param?: any): void,
}

export interface Notifier {
    (type: EventType, param?: any): void,
}

export function useListener(type: EventType, consumer: EventConsumer, deps?: Array<any>) {
    const dependents = deps || [] as Array<any>;

    consumer = useCallback(consumer, dependents);
    useEffect(() => {
        const callback = (event: any) => {
            consumer(type, event);
        };
        mq.on(type, callback);
        return () => {
            mq.off(type, callback);
        }
    }, [consumer, ...dependents]);
}

export function useNotifier(): Notifier {
    return useCallback((type, param) => {
        console.log("notify", type, param);
        mq.emit(type, param);
    }, [])
}