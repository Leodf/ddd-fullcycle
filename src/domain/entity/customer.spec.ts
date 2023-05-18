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
})