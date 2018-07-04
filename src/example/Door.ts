import { Event, Getter } from '../Event';

@Event('DefaultPattern')
export class Door {
    public get() {
        return 'Door';
    }

    public sizeDoorWindow() {
        const window = Getter<any>('Window');
        console.log(`Size of window on door is: ${window.size()}`);
    }
}
