import { EventEmitter } from 'events';

export class CustomEmitter extends EventEmitter {
    public emitClass<T>(event: any, obj = {}): T | {} {
        this.emit(event, obj);
        return obj;
    }
}
