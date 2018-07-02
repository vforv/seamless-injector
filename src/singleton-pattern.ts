import { AbstractPattern } from './abstract-pattern';

export class SingletonPattern implements AbstractPattern {
    private singletonEvents: Map<string, any>;

    constructor(private emitter: any) {
        this.singletonEvents = new Map();
    }

    public register(name: string, target: any) {
        this.singletonEvents.set(name, new target());

        this.emitter.on(name, (e: any) => {
            e.message = this.singletonEvents.get(target.name);
        });
    }
}
