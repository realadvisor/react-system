### makeSystemValue(values: Array<T>): T

A function to create responsive value outside of system elements and css.
It accepts a set of values similar to `p` or `m` which are applied depending
on current viewport size.

### hidden system prop

Hiding elements depending on viewport size is quite often task in complex
responsive UI. This proposal allows to pass responsive value to hidden prop.
