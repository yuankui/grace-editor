class A {
    print() {
        console.log('A');
    }
}

class B {
    print() {
        console.log('B');
    }
}


const c = [A, B];

for (let X of c) {
    const ss = new X();
    ss.print();
}