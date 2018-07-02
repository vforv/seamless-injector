import { Event } from '../Event';

@Event('SingletonPattern')
export class Window {
    private windowSize: number;

    constructor() {
        this.windowSize = Math.random();
    }

    public get() {
        return 'Window';
    }

    public size() {
        return this.windowSize;
    }
}
