import { Event, Getter } from '../Event';
import { Boot } from '../Boot';

@Event()
export class House extends Boot {
    public register() {
        const door = Getter<any>('Door');
        const window = Getter<any>('Window');

        console.log(`House has ${door.get()} and ${window.get()}`);
        door.sizeDoorWindow();
        console.log(`Size of other windows in the house is same because of singleton class: ${window.size()}`);
    }
}
