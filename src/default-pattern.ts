import { AbstractPattern } from './abstract-pattern';

export class DefaultPattern implements AbstractPattern {
    constructor(private emitter: any) { }

    public register(name: string, target: any) {
        this.emitter.on(name, (e: any) => {
            e.message = new target();
        });
    }
}
