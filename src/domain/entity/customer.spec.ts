import Address from "./address"
import Customer from "./customer"

describe('Customer unit tests', () => {
    test('Should throw error when id is empty', () => {
        expect(() => {
            let customer = new Customer("", "John")
        }).toThrowError("Id is required")
    })
    test('Should throw error when name is empty', () => {
        expect(() => {
            let customer = new Customer("123", "")
        }).toThrowError("Name is required")
    })
    test('Should change name', () => {
        const customer = new Customer("123", "John")
        
        customer.changeName("Jane")

        expect(customer.name).toBe("Jane")
    })
    test('Should activate customer', () => {
        const customer = new Customer("1", "Customer 1")
        const address = new Address("Street 1", 123, "13330-250", "São Paulo")
        customer.address = address

        customer.activate()

        expect(customer.isActive()).toBe(true)
    })
    test('Should throw error if address is undefined when activate customer', () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1")
            customer.activate()
        }).toThrowError("Address is mandatory to activate a customer")
    })
    test('Should deactivate customer', () => {
        const customer = new Customer("1", "Customer 1")
        customer.deactivate()

        expect(customer.isActive()).toBe(false)
    })
    test('Should add reward points', () => {
        const customer = new Customer("1", "Customer 1")
        expect(customer.rewardPoints).toBe(0)
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10)
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(20)

    })
    test('Should change Address', () => {
        const address = new Address("street 1", 123, '123456-789', 'São Paulo')
        const customer = new Customer("1", "Customer 1", address)
        expect(customer.address).toEqual({
            _street: 'street 1',
            _number: 123,
            _zip: '123456-789',
            _city: 'São Paulo'
        })
        const address2 = new Address("street 2", 456, '789456-123', 'Rio de Janeiro')
        customer.changeAddress(address2)
        expect(customer.address).toEqual({
            _street: 'street 2',
            _number: 456,
            _zip: '789456-123',
            _city: 'Rio de Janeiro'
        })
    })
})