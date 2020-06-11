import mitt from 'mitt';
import {EventMap} from "./events";
import {useEffect} from "react";

export interface Handler<T> {
    (event: T): void,
}

export class EventBus {
    private eventBus: mitt.Emitter;
    constructor() {
        this.eventBus = mitt();
    }

    emit<T extends keyof EventMap>(type: T, event?: EventMap[T]) {
        this.eventBus.emit(type, event);
    }

    on<T extends keyof EventMap>(type: T, listener: Handler<EventMap[T]>) {
        this.eventBus.on(type, listener);
    }

    off<T extends keyof EventMap>(type: T, listener: Handler<EventMap[T]>) {
        this.eventBus.off(type, listener);
    }

    useListener<T extends keyof EventMap>(type: T, listener: Handler<EventMap[T]>, deps?: Array<any>) {
        useEffect(() => {
            this.on(type, listener);
            return () => this.off(type, listener);
        }, deps || []);
    }
}