import { Event } from '../Event';

@Event()
export class Door {
    constructor() {}

    get() {
        console.log("Door")
    }
}