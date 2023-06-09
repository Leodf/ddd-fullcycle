import EventInterface from "../../@shared/event/interfaces/event-interface"

export default class CustomerChangedAddressEvent implements EventInterface {
    dataTimeOccurred: Date
    eventData: any

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date()
        this.eventData = eventData
    }
}