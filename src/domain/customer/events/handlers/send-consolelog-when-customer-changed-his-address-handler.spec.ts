import Address from "../../value-object/address"
import Customer from "../../entity/customer"
import CustomerChangedAddressEvent from "../customer-changed-address-event"
import SendConsoleLogWhenCustomerChangedAddressHandler from "./send-consolelog-when-customer-changed-his-address-handler"
import EventDispatcher from "../../../@shared/event/dispatcher/event-dispatcher"

describe('Customer Changed Addrees handler test', () => {
    test('should notify event when customer change his address', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendConsoleLogWhenCustomerChangedAddressHandler()

        eventDispatcher.register('CustomerChangedAddressEvent', eventHandler)
        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        const address = new Address("street 1", 123, '123456-789', 'São Paulo')
        const customer = new Customer("1", "Customer 1", address)
        const address2 = new Address("street 2", 456, '789456-123', 'Rio de Janeiro')
        customer.changeAddress(address2)

        const customerChangedAddress = new CustomerChangedAddressEvent({
            id: customer.id,
            name: customer.name,
            address: `${customer.address.toString()}`
        })
        
        eventDispatcher.notify(customerChangedAddress)

        expect(spyEventHandler).toHaveBeenCalledTimes(1)
    })
})