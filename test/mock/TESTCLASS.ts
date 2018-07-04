export class TESTCLASS {
    public num: number;

    constructor() {
        this.num = Math.random();
    }
    
    public getClass() {
        return 'TestClass';
    }

    public rndNum() {
        return this.num;
    }
}

export class TESTCLASSMock {
    public num: number;

    constructor() {
        this.num = Math.random();
    }
    
    public getClass() {
        return 'TestClassMock';
    }

    public rndNum() {
        return this.num;
    }
}

