# Randoscando
A simple library for seed based predictable randomness.

> The Randoest of the Scandoest

Randoscando follows a generator style setup for its randomness, you will be able to map random functions together via map, and manually move randomness forward using step like functions

## Install

```cli
npm i randoscando
```

## Usage

The documentation will show you what each random function is capable of doing however in order to sequence these you need to use the `step` function

Using `step` allows you to move the randomness and its seed forward

In the example below the response is `[90, 0.8986478650476784]` where `90` is the random integer generated using the `'abc123'` seed, and `0.8986478650476784` is the next seed in the sequence. Float numbers like this will always be the type of seeds returned from `randoscando` however when you call step, you can give it any kind of `String` or `Number` you'd like.

### Example

```js
import randoscando from 'randoscando'

randoscando.step(randoscando.int(1, 100), 'abc123') // => [90, 0.8986478650476784]
```

### Using Functions By Themselves
You can for sure use randoscandos functions without using `step` you just need to treat them as a simple generator


#### Example

```js
import randoscando from 'randoscando'
import { alea } from 'randoscando/_internal/alea'

randoscando.int(1, 100) // => { value: 100, step: function (seed) {} }

const seed = alea('abc123')
const int = randoscando.int(1, 100)

int.step(seed) // => [90, 0.8986478650476784]
```

The main thing `step` does is advance the randomness forward and help keep track of providing a new seed without the need of you creating a new alea seed everytime

## Why?

I built RandoScando to mess around with seed based randomness and the algorithm behind it, just as a fun little project.

As for the name it came from a variable one of my good friends and coworkers used in one of our projects, so that it may live on forever.

## Feedback

Please feel free to provide any and all feedback whether it involves better documentation, function ideas, or better ideas of how to handle functionality.
