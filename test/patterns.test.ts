import 'mocha';
import { expect } from 'chai';
import { CustomEmitter } from '../src/custom-emitter';
import { DefaultPattern } from '../src/default-pattern';
import { SingletonPattern } from '../src/singleton-pattern';
import { TESTCLASS } from './mock/TESTCLASS';

describe('Pattern tests', () => {

    it('Default pattern should work', () => {
        const emitter = new CustomEmitter();
        const defaultPattern = new DefaultPattern(emitter);
        defaultPattern.register('someEvent', TESTCLASS);
        const testclass: any = emitter.emitClass('someEvent');
        const testclassagain: any = emitter.emitClass('someEvent');
        expect(testclass.message.getClass()).to.be.equals('TestClass');
        expect(testclass.message.rndNum()).to.not.be.equals(testclassagain.message.rndNum())
    });

    it('Singleton pattern should work', () => {
        const emitter = new CustomEmitter();
        const singletonPattern = new SingletonPattern(emitter);
        singletonPattern.register('someSingletonEvent', TESTCLASS);
        
        const testclass: any = emitter.emitClass('someSingletonEvent');
        const testclassagain: any = emitter.emitClass('someSingletonEvent');
        expect(testclass.message.getClass()).to.be.equals('TestClass');
        expect(testclass.message.rndNum()).to.be.equals(testclassagain.message.rndNum())
    });
})
