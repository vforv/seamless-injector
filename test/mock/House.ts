import { Getter, Event } from '../../src/Event';

@Event()
export class House {
    public getHouse() {
        const windows: any = Getter('Windows');
        return 'Home' + windows.getWindows();
    }
}
