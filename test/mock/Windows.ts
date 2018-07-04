import { Event } from '../../src/Event';

@Event('SingletonPattern')
export class Windows {
    private size: number;

    constructor() {
        this.size = Math.random();
    }

    public getWindowsSize() {
        return this.size;
    }

    public getWindows() {
        return 'Windows';
    }
}