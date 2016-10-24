import Test from './Test'

class Main {
    constructor(name) {
        this.test = new Test("test");
    }

    say() {
        this.test.say();
    }
}

const main = new Main()

main.say()
