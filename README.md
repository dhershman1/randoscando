# Randoscando
A simple library for predictable randomness.

Seed based random functions that always return a new function back

The Randoest of the Scandoest

Randoscando follows a generator style setup for its randomness, you will be able to map random functions together via map, and manually move randomness forward using step like functions

## Usage

Each of the functionality built into RandoScando are meant to manually be moved forward using things like `step`

I am currently debating if I want map to act as a step, or if it should also return as a generator

### step

A function used to manually move forward a step with a randomness generator

#### Arguments

- `fnGen` -- `Function` - A function which returns a generator object
- `seed` -- `String|Number` - A seed for randomness

#### Returns

- `[Any, Number]` - A data value created from the provided generator, and the seed from that generator

#### Usage
```js
import random from 'randoscando'

random.step(random.int(1, 5), 'abc123') // => [5, 0.8986478650476784]
random.step(random.int(1, 100), 'abc123') // => [90, 0.8986478650476784]
```

### map

Takes a list of randomness generators and creates a list of their values

#### Arguments

- `fnList` -- `((a) => [Any, Number])[]` - The array of random generator functions
- `seed` -- `String|Number` - A seed for randomness

#### Returns

- `[Any[], Number]` - An array with an array of random values in the first index, and a new seed from the map as the second index

#### Usage
```js
random.map([
    random.int(1, 5),
    random.float(0, 2)
  ], 'abc123') // => [[5, 1.9751403988339007], 0.8987810940016061]

random.map([
    random.int(1, 5),
    random.float(0, 2)
  ], 'waaaa') // => [[2, 0.0943715781904757], 0.21161161735653877]

random.map([
    random.int(5, 100),
    random.float(0, 4)
  ], 'abc123') // => [[91, 3.9502807976678014], 0.8987810940016061]
```

> **Note**: Currently in process of re writing readme as currently the library is in rapid change mode
