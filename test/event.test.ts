import 'mocha';
import { expect } from 'chai';
import { Container } from '../src/Container';
// import { House } from './mock/House';
// import { BootApp } from './mock/Boot';
import { Windows } from './mock/Windows';
import { Getter } from '../src/Event';

describe('Event.ts test', () => {
    it('Resolve deps', () => {
        Container.resolve([Windows]);
        const windows: any = Getter('Windows');
        expect(windows.getWindows()).to.be.equals('Windows');
    })
})
