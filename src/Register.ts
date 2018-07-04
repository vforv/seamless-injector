import { EventEmitter } from 'events';
import { IType } from './Model';
import { Boot } from './Boot';
import { allPatterns } from './patterns';
import { CustomEmitter } from './custom-emitter';

export interface IContainer {
    set(target: IType<any>, type?: string): any;
    bootApp(target?: any[]): Boot;
    emit(e: any): any;
    mock(mocked: any, type: string): void;
}

/*eslint new-parens: "error"*/
export const Register: IContainer = new class {
    private emitter: EventEmitter;
    private boot: any;
    private patterns: Map<string, any>;

    constructor() {
        this.patterns = new Map();

        allPatterns.forEach((pattern) => {
            this.patterns.set(pattern.name, pattern);
        });

        // create new emitter and method which return class
        this.emitter = new CustomEmitter();
    }

    /**
     * get class
     * @param event this should be class wihich we want to return
     */
    public emit(event: string) {
        const emitter: any = this.emitter;
        return emitter.emitClass(event);
    }

    /**
     * Unbind all events
     */
    public mock(mocked: any, type: string) {
        const mockedClassOrginalNameAsEventName = this.getEventNameFromClass(mocked);
        this.registerDeps(type, mocked, mockedClassOrginalNameAsEventName);
    }

    /**
     * @param target class not init
     * @param type
     */
    public set(target: IType<any>, type: string) {
        if (target.prototype instanceof Boot) {
            this.boot = new target();
        }

        if (!type) {
            throw new Error(`You must set type for class: ${target.name}`);
        }

        const classNameAsEventName = this.getEventNameFromClass(target);
        this.registerDeps(type, target, classNameAsEventName);
    }

    public bootApp(targets?: any[]): Boot {
        return this.boot;
    }

    private getEventNameFromClass(target: any): string {
        let eventName = target.name;

        if (eventName.slice(-4) === 'Mock') {
            eventName = eventName.slice(0, -4);
        }

        return eventName;
    }

    private registerDeps(type: string, target: any, eventName: string) {
        const patternResolve = this.patterns.get(type);
        if (!patternResolve) {
            throw new Error(`Wrong pattern for class: ${target.name}`);
        }

        const reg = new patternResolve(this.emitter);

        reg.register(eventName, target);
    }
}();
