export interface Foo {
    x: number;
}

export function makeFoo(x: number): Foo {
    if (x >= 0) {
        return {x};
    } else {
        return {x: -x};
    }
}

export function incrementFoo(foo: Foo) {
    foo.x++;
}
