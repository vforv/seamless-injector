import { EventEmitter } from "events";

class MyEvent extends EventEmitter {
    emitObject(event: any, obj = {}) {
        this.emit(event, obj);
        return obj;
    }
};

const emitter = new MyEvent();

class TestClass {
    doJob() {
        console.log("DONE");
    }
}

emitter.on('TestClass', (e) => {
    e.messaage = new TestClass();
});

class NewClass {
    log() {
        const e: any = emitter.emitObject('TestClass');
        e.messaage.doJob()
    }
}

const log = new NewClass();

log.log()