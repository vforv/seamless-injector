import { Getter, Event } from '../../src/Event';

@Event('DefaultPattern')
export class House {
    public getHouse() {
        const windows: any = Getter('Windows');
        return 'Home' + windows.getWindows();
    }

    public getWindowsOnHouse() {
        const windows: any = Getter('Windows');
        return windows.getWindowsSize();
    }
}
