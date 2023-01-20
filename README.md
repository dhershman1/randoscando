# Randoscando
A simple library for predictable randomness.

Seed based random functions that always return a new function back

## Functions

All the below functions with 2+ arguments are curried so they can be partially executed as needed

### num
Gives back a random number up to a provided maximum

#### Arguments
- `max` -- `Number` - A number to set the max the random number can go up to
- `seed` -- `String|Number` - A Random seed user created seed


#### Return
- `[Number, Number]` -- Gives back an array with 2 indexes, the first being the random number, the 2nd being a new seed
#### Usage
```js
import random from 'randoscando'

random.num(20, 'abc123') // => [17, 0.8986478650476784]
random.num(20, 'abc') // => [19, 0.9722709273919463]
```

#### minNum
Give a random number between a min and a max

#### Arguments
- `min` -- `Number` - The minimum the random number can be
- `max` -- `Number` - The maximum the random number can be
- `seed` -- `String|Number` - The seed to generate the data

#### Return
- `[Number, Number]` -- Gives back an array with 2 indexes, the first being the random number, the second being a new seed

#### Usage
```js
import random from 'randoscando'

random.minNum(1, 100, 'abc123') // => [90, 0.8986478650476784]
random.minNum(1, 100, 'abc') // => [98, 0.9722709273919463]
```

### pick
Picks a random value from a provided array or string

#### Arguments
- `list` -- `Any[]|String` - The list to pull the random value from
- `seed` -- `String|Number` - The seed to generate the data

#### Return
- `[Any, Number]` -- Gives back an array with 2 indexes, the first being the randomly picked value, the second being a new seed

#### Usage
```js
import random from 'randoscando'

random.pick('abc123', 'ahhhh') // => ['3', 0.8598122051917017]
random.pick([1, 2, 3], 'abc') // => [3, 0.9722709273919463]
```

### letter
Picks a random letter from `A-Z`

#### Arguments
- `seed` -- `String|Number` - The seed to generate the data

#### Return
- `[String, Number]` -- Gives back an array with 2 indexes, the first being the random letter, the second being a new seed

#### Usage
```js
import random from 'randoscando'

random.letter('abc123') // => ['Z', 0.9875701994169503]
random.letter(0.9875701994169503) // => ['M', 0.49460635893046856]
```

### seeder
A function that loops through an array of random functions moving a new seed to each one and collect the random values in a new array

#### Arguments
- `fns` -- `Function[]` - An array of random functions that take a value, and seed style arguments
- `seed` -- `String|Number` - The seed to generate the data

#### Return
- `[Any[], Number]` -- An array where the first index is a newly created array of random values and the second is a new seed

#### Usage
```js
import random from 'randoscando'

random.seeder([
    random.pick([1, 2, 3, 4]),
    random.pick([1, 2, 3, 4]),
    random.pick([1, 2, 3, 4]),
    random.pick([1, 2, 3, 4]),
    random.pick([1, 2, 3, 4])
  ], 'wooopie') // => [[3, 1, 1, 4, 2], 0.30550888809375465]
```

### pieces
A function that pieces together a new string based on the tables passed into it

#### Arguments
- `keys` -- `String[]` - An array of string keys to reference the table object data with
- `tables` -- `Object` - An object of key value pairing where the key is in `keys` and the value is a list to pick a random string from
- `seed` -- `String|Number` - The seed to generate the data

#### Returns
- `[String, Number]` - An array with the first index being the pieced together string, and the second being a new seed

#### Usage
```js
import random from 'randoscando'

const tables = { line: ['hello', 'world', 'zoooop'], zip: [44444, 55555, 66666] }

random.pieces(['line', 'zip'], tables, 'abc123') // => ['zoooop 66666', 0.9875701994169503]
```

### probability
A simple probability function to pick a random value based on weights assigned to them

#### Arguments
- `list` -- `[[Any, Number]]` - An array of arrays for value and weight assigning
- `seed` -- `String|Number` - The seed to generate the data

#### Returns
- `[value, Number]` - An array where the first index is the chosen value and the second is a new seed

#### Usage
```js
import random from 'randoscando'

random.probability([
    ['hello', 0.5],
    ['world', 0.5]
  ], 'abc123') // => ['world', 0.6556187274400145]
random.probability([
    ['hello', 0.9],
    ['world', 0.1]
  ], 'abc123') // => ['hello', 0.2178527475334704]
```

### date
Create a random date string based on a format and date table that are provided

#### Arguments
- `format` -- `String` - A format string to replace use `M` for month `D` for day and `Y` for year
- `dateTable` -- `Object` - An object with keys `months`, `days`, and `years` as keys with arrays of strings for each
- `seed` -- `String|Number` - The seed to generate the data

#### Returns
- `String` - A date string in the desired format

#### Usage
```js
import random from 'randoscando'

const datesTable = { months: ['01', '02', '03'], days: ['12', '09', '20'], years: ['2010', '2023', '2020'] }

random.date('M/D/Y', datesTable, 'abc123') // => ['03/12/2023', 0.49460635893046856]
random.date('M/D/Y', datesTable, 'coolbeans') // => ['03/09/2020', 0.9407318972516805]
```
