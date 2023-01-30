[![Build Status](https://travis-ci.org/vforv/seamless-injector.svg?branch=master)](https://travis-ci.org/vforv/seamless-injector)
[![Coverage Status](https://coveralls.io/repos/github/vforv/seamless-injector/badge.svg?branch=master)](https://coveralls.io/github/vforv/seamless-injector?branch=master)

[![NPM](https://nodei.co/npm/seamless-injector.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/seamless-injector/)


Example:

```
// Window.ts
import { Event } from 'seamless-injector';

@Event('SingletonPattern')
export class Window {
    private windowSize: number;

    constructor() {
        this.windowSize = Math.random();
    }

    public get() {
        return 'Window';
    }

    public size() {
        return this.windowSize;
    }
}
```

```
// House.ts
import { Event, Getter } from '../Event';
import { Window } from './Window';

@Event('DefaultPattern')
export class House {
    public register() {
        const window = Getter<any>('Window');
        console.log(`House has ${window.get()}`);
    }
}
```

```
//index.ts
import './Window';
import { House } from './House';

const house = new House();
house.register();
```

To mock event just call

```
import { Register } from 'seamless-injector';
Register.mock(WindowsMock, 'DefaultPattern');
```