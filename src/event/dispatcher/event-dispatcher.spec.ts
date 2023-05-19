import EventDispatcher from "./event-dispatcher"
import SendEmailWhenProductIsCreatedHandler from "../handler/send-email-when-product-is-created-handler"
import SendConsoleLog1Handler from "../handler/send-consolelog1-when-customer-is-created-handler"
import SendConsoleLog2Handler from "../handler/send-consolelog2-when-customer-is-created-handler"
import ProductCreatedEvent from "../product-created-event"
import CustomerCreatedEvent from "../customer-created-event"

describe('Domain events tests', () => {
    test('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        const eventHandler2 = new SendConsoleLog1Handler()
        const eventHandler3 = new SendConsoleLog2Handler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler3)

        expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(1)
        expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"].length).toBe(2)
        expect(eventDispatcher.eventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)
        expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2)
        expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler3)
    })
    test('should unregister an event handler', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.eventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(0)
    })
    test('should unregister all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(
            eventDispatcher.eventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler)

        eventDispatcher.unregisterAll()

        expect(
            eventDispatcher.eventHandlers["ProductCreatedEvent"]
        ).toBeUndefined()
    })
    test('should notify all event handlers', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        const eventHandler2 = new SendConsoleLog1Handler()
        const eventHandler3 = new SendConsoleLog2Handler()

        const spyEventHandler = jest.spyOn(eventHandler, "handle")
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle")
        const spyEventHandler3 = jest.spyOn(eventHandler3, "handle")

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler3)

        expect(
            eventDispatcher.eventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler)
        expect(
            eventDispatcher.eventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler2)
        expect(
            eventDispatcher.eventHandlers["CustomerCreatedEvent"][1]
        ).toMatchObject(eventHandler3)

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        })
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: '1',
            name: "Customer 1",
            address: "Street 1 nº 123, cep: 13330-250, São Paulo - SP",
            active: true,
            rewardPoints: 10.0
        })
        const customerCreatedEvent2 = new CustomerCreatedEvent({
            id: '2',
            name: "Customer 2",
            address: "Street 2 nº 456, cep: 13456-250, São Paulo - SP",
            active: true,
            rewardPoints: 5.0
        })

        eventDispatcher.notify(productCreatedEvent)
        eventDispatcher.notify(customerCreatedEvent)
        eventDispatcher.notify(customerCreatedEvent2)
        expect(spyEventHandler).toHaveBeenCalledTimes(1)
        expect(spyEventHandler2).toHaveBeenCalledTimes(1)
        expect(spyEventHandler3).toHaveBeenCalledTimes(1)
    })
})