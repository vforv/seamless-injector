import { Event, Emitter } from '../Event';
import { Door } from './Door';
import { Container } from '../Container';
import { Boot } from '../Boot';
import { Window } from './Window';

@Event()
export class House extends Boot {
    register() {
        const doorClass = Emitter('Door');

        doorClass.message.get();
        console.log("TEST")
    }
}

const d = Container.resolve([Door, House, Window]);
d.register();