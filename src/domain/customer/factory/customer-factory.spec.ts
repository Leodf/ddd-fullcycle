import Address from "../value-object/address";
import CustomerFactory from "./customer-factory";

describe('Customer factory unit test', () => {
    test('should create a customer', () => {
        const customer = CustomerFactory.create("Leonardo")

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Leonardo");
        expect(customer.address).toBeUndefined();
    })
    test("should create a customer with an address", () => {
        const address = new Address("Street", 1, "13330-250", "São Paulo");

        const customer = CustomerFactory.createWithAddress("Leonardo", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Leonardo");
        expect(customer.address).toBe(address);
    });
})