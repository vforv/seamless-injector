import 'mocha';
import { expect } from 'chai';
import { Register } from '../src/Register';
import { TESTCLASS, TESTCLASSMock, TESTCLASSNOTEXISTSMock } from './mock/TESTCLASS';

describe('Register tests', () => {
    it('Register dependencies', () => {
        (Register as any).registerDeps('SingletonPattern', TESTCLASS, TESTCLASS.name);
        const testclass: any = Register.emit('TESTCLASS');
        expect(testclass.message.getClass()).to.be.equals('TestClass');
    });

    it('Should return event name from class', () => {
        const eventName = (Register as any).getEventNameFromClass(TESTCLASS);
        expect(eventName).to.be.equals('TESTCLASS');
    })

    it('Should return event name from mocked class', () => {
        const eventName = (Register as any).getEventNameFromClass(TESTCLASSMock);
        expect(eventName).to.be.equals('TESTCLASS');
    })

    it('Mocking should work', () => {
        Register.mock(TESTCLASSMock, 'SingletonPattern');
        const testclass: any = Register.emit('TESTCLASS');
        expect(testclass.message.getClass()).to.be.equals('TestClassMock');
    })

    it('Cannot mock class which doesnt exists', () => {
        expect(() => Register.mock(TESTCLASSNOTEXISTSMock, 'DefaultPattern')).throws(`TESTCLASSNOTEXISTS cannot be mocked because that class doesn't exist.`);
    })

    it('Register dependencies wrong pattern', () => {
        expect(() => (Register as any).registerDeps('Default', TESTCLASS)).to.throws('Wrong pattern for class: TESTCLASS');
    });
})
