import Address from "../value-object/address"

export default class Customer {
    private _id: string
    private _name: string
    private _address!: Address
    private _active: boolean = false
    private _rewardPoints: number = 0
    
    constructor(id: string, name: string, address?: Address) {
        this._id = id
        this._name = name
        this._address = address
        this.validate()
    }

    get name(){
        return this._name
    }

    validate() {
        if(this._name.length === 0) {
            throw new Error("Name is required")
        }
        if(this._id.length === 0) {
            throw new Error("Id is required")
        }
    }

    get id(): string {
        return this._id
    }

    get address(): Address {
        return this._address
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    set address(address: Address) {
       this._address = address
    }
    
    changeName(name: string) {
        this._name = name
        this.validate()
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    activate() {
        if(this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer")
        }
        this._active = true
    }

    deactivate() {
        this._active = false
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points 
    }

    isActive(): boolean {
        return this._active
    }
}