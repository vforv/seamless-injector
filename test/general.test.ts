import 'mocha';
import { expect } from 'chai';
import { Getter } from '../src/Event';
import { Register } from '../src/Register';
import './mock/House';
import './mock/Windows';
import { BootApp } from './mock/Boot';

describe('General tests', () => {
    it('Test all', () => {
        const windows: any = Getter('Windows');
        const house: any = Getter('House');
        expect(windows.getWindows()).to.be.equals('Windows');
        expect(windows.getWindowsSize()).to.be.equals(house.getWindowsOnHouse());
    });

    it('App should boot', () => {
        Register.set(BootApp, 'DefaultPattern');
        const bootApp: any = Register.bootApp();
        expect(bootApp.register()).to.be.equals('HomeWindows');
    })

    it('App should boot', () => {
        expect(() => Register.set(BootApp)).throws('You must set type for class: BootApp');
    })
})
