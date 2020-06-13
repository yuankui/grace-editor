import mitt from 'mitt';
import {EventMap} from "./events";
import {useEffect} from "react";

export interface Handler<T> {
    (event: T, resolve: Resolve): void,
}

export interface InnerHandler<T> {
    (event: {
        event: T,
        resolve: Resolve,
    }): void,
}

export interface Resolve {
    (): void,
}

export class EventBus {
    private eventBus: mitt.Emitter;
    constructor() {
        this.eventBus = mitt();
    }

    emit<T extends keyof EventMap>(type: T, event?: EventMap[T], timeout?: number) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('event', type, event);
                this.eventBus.emit(type, {
                    event,
                    resolve,
                });
            }, timeout || 0);
        })

    }

    private on<T extends keyof EventMap>(type: T, listener: InnerHandler<EventMap[T]>) {
        this.eventBus.on(type, listener);
    }

    private off<T extends keyof EventMap>(type: T, listener: InnerHandler<EventMap[T]>) {
        this.eventBus.off(type, listener);
    }

    useListener<T extends keyof EventMap>(type: T, listener: Handler<EventMap[T]>, deps?: Array<any>) {
        const handler: InnerHandler<EventMap[T]> = event => {
            listener(event.event, event.resolve);
        }

        useEffect(() => {
            this.on(type, handler);
            return () => this.off(type, handler);
        }, deps || []);
    }
}