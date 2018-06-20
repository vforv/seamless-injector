import { Event, Emitter } from '../Event';
import { Door } from './Door';
import { Container } from '../Container';

@Event()
export class House {
    constructor() { 
        const doorClass = Emitter('Door');
        doorClass.message.get();
    }

    get () {
        
    }
}

const d = Container.resolve([Door, House]);

d[1].get();