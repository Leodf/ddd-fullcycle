import Address from "./domain/customer/value-object/address"
import Customer from "./domain/customer/entity/customer"
import Order from "./domain/checkout/entity/order"
import OrderItem from "./domain/checkout/entity/order_item"


let customer = new Customer("123", "Leonardo de Faveri")
const address = new Address("Rua dois", 2, "12345-678", "São Paulo")
customer.address = address
customer.activate()

const item1 = new OrderItem("1", "Item 1", 10, "1", 10)
const item2 = new OrderItem("2", "Item 2", 15, "2", 20)
const order = new Order("1", "123", [item1, item2])