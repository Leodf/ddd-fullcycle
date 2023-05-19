import CustomerChangedAddressEvent from "../customer-changed-address-event";
import EventHandlerInterface from "../interfaces/event-handler-interface";

export default class SendConsoleLogWhenCustomerChangedAddressHandler
    implements EventHandlerInterface<CustomerChangedAddressEvent>
{
    handle(event: CustomerChangedAddressEvent): void {
        const { id, name, address } = event.eventData
        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`);
    }
}