import { Event, Emitter } from '../Event';

@Event()
export class Door {
    constructor() {}

    get() {
        const window = Emitter('Window');
        console.log(window.message.get());
        console.log("Door")
    }
}