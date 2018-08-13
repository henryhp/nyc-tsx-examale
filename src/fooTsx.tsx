import React from 'react';

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

export class Component extends React.Component{

    render () {
        return (
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci alias consequuntur dicta dolor doloribus harum iste itaque nemo odio pariatur perferendis quae quas quia quos rerum, sapiente, suscipit voluptatibus.</div>
        )
    }
}