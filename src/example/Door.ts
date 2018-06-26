import { Event, Getter } from '../Event';

@Event()
export class Door {
    constructor() { }

    get() {
        return 'Door';
    }

    sizeDoorWindow() {
        const window = Getter<any>('Window');
        console.log(`Size of window on door is: ${window.size()}`);
    }
}