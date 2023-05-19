import EventDispatcherInterface from "../interfaces/event-dispatcher-interface";
import EventHandlerInterface from "../interfaces/event-handler-interface";
import EventInterface from "../interfaces/event-interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private _eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {}

    get eventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this._eventHandlers;
    }

    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = []
        }
        this._eventHandlers[eventName].push(eventHandler)
    }
    unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if (this._eventHandlers[eventName]) {
            const index = this._eventHandlers[eventName].indexOf(eventHandler)
            if (index !== -1) {
                this._eventHandlers[eventName].splice(index, 1)
            }
        }
    }
    unregisterAll(): void {
        this._eventHandlers = {}
    }
    notify(event: EventInterface): void {
        const eventName = event.constructor.name
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((eventHandler) => {
                eventHandler.handle(event)
                this.unregister(eventName, eventHandler)
            })
        }
    }
}