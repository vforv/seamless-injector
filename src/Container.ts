import { EventEmitter } from "events";
import { IType } from './Model';
import { Boot } from './Boot';

export interface IContainer {
    set(target: IType<any>, type?: string): any;
    resolve<T>(target: any): any;
    emit(e: any): any;
}

/*eslint new-parens: "error"*/
export const Container: IContainer = new class {
    private emitter: EventEmitter;
    private boot: Boot;
    private singletonEvents: Map<any, any>;

    constructor() {
        this.singletonEvents = new Map();
        // create new emitter and method which return class
        this.emitter = new class extends EventEmitter {
            public emitClass<T>(event: any, obj = {}): T | {} {
                this.emit(event, obj);
                return obj;
            }
        };
    }

    /**
     * get class
     * 
     * @param event this should be class wihich we want to return
     */
    public emit(event: string) {
        const emitter: any = this.emitter;
        return emitter.emitClass(event)
    }

    /**
     * 
     * @param target class not init
     * @param type 
     */
    public set(target: IType<any>, type?: string) {
        if (target.prototype instanceof Boot) {
            this.boot = new target();
        }

        if(type === 'singleton') {
            this.singletonEvents.set(target.name, new target());

            this.emitter.on(target.name, (e) => {
                e.message = this.singletonEvents.get(target.name);
            });
        } else {
            this.emitter.on(target.name, (e) => {
                e.message = new target();
            });
        }
        
        
    }

    public resolve<T>(targets: any[]) {
        return this.boot;
    }
}