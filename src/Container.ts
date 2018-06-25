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
    // private _events: Map<any, any> = new Map<any, any>();
    private emitter: EventEmitter;
    private boot: any;

    constructor() {
        this.emitter = new class extends EventEmitter {
            emitObject(event: any, obj = {}) {
                this.emit(event, obj);
                return obj;
            }
        };
    }

    public emit(c: any) {
        const e: any = this.emitter;
        return e.emitObject(c)
    }

    public set(target: IType<any>, type?: string) {
        if(target.prototype instanceof Boot) {
            this.boot = new target();
        }

        this.emitter.on(target.name, (e) => {
            e.message = new target();
        });
    }

    public resolve<T>(targets: any[]) {
        return this.boot;
    }
}