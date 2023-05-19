import EventHandlerInterface from "../../../@shared/event/interfaces/event-handler-interface";
import CustomerChangedAddressEvent from "../customer-changed-address-event";

export default class SendConsoleLogWhenCustomerChangedAddressHandler
    implements EventHandlerInterface<CustomerChangedAddressEvent>
{
    handle(event: CustomerChangedAddressEvent): void {
        const { id, name, address } = event.eventData
        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`);
    }
}