import { EventEmitter } from 'events';
import { IType } from './Model';
import { Boot } from './Boot';
import { allPatterns } from './patterns';
import { CustomEmitter } from './custom-emitter';
import StackTrace from 'stacktrace-js';

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
    private allEvents: Map<string, number>;

    constructor() {
        this.patterns = new Map();
        this.allEvents = new Map();

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
        if (this.allEvents.get(classNameAsEventName) !== undefined) {
            const tries = this.allEvents.get(classNameAsEventName) as number + 1;
            this.allEvents.set(classNameAsEventName, tries);
            console.warn(`Class ${classNameAsEventName} already registred ${tries}.`);

            StackTrace.fromError(new Error()).then((stackFrames) => {
                const path = stackFrames[1].toString();
                console.warn(`Event decorator being called from: ${path}`);
            });
            return;
        }
        this.allEvents.set(classNameAsEventName, 1);
        this.registerDeps(type, target, classNameAsEventName);
    }

    public bootApp(targets?: any[]): Boot {
        return this.boot;
    }

    private getEventNameFromClass(target: any): string {
        let eventName = target.name;

        if (eventName.slice(-4) === 'Mock') {
            eventName = eventName.slice(0, -4);
            const classRet = this.emit(eventName);
            if (!classRet || !classRet.message) {
                throw Error(`${eventName} cannot be mocked because that class doesn't exist.`);
            }
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
