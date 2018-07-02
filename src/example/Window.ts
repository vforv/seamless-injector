import { Event } from '../Event';

@Event('SingletonPattern')
export class Window {
    private windowSize: number;

    constructor() {
        this.windowSize = Math.random();
    }

    get() {
        return 'Window';
    }

    size() {
        return this.windowSize;
    }
}
