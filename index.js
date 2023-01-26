import K from 'kyanite'
import { alea } from './_internal/alea.js'
import { _curry2 } from './_internal/curry.js'

/**
 * @name initialSeed
 * @function
 * @since v0.1.0
 * @category Function
 * @sig (seed) -> AleaSeed
 * @description Creates an initial seed using the alea algorithm
 * @param {Number|String} seed The seed we want to use to create the randomness
 * @returns {Object} A alea object for seed generation and usage
 * @example
 * import random from 'randoscando'
 *
 * random.initialSeed('abc123') // => AleaSeedObject
 */
function initialSeed (seed) {
  return alea(seed)
}

/**
 * @name step
 * @function
 * @since v0.1.0
 * @category Function
 * @sig { value: any, step: (seed) => [RandomGenerator, Seed] } -> AleaSeed -> [any, Seed]
 * @description Manually step through a random function in order to generate a value
 * @param {Object} fnGen The Generator function to step through and get a value from
 * @param {Number|String|Seed} seed The seed we want to use to create the randomness
 * @returns {[any, Seed]} An array pair with the value at [0] and the next seed at [1]
 * @example
 * import random from 'randoscando'
 *
 * random.step(random.int(1, 100), 'abc123') // => [90, 0.8986478650476784]
 * // Also curried
 * const stepper = random.step(random.int(1, 100))
 *
 * stepper('abc123') // => [90, 0.8986478650476784]
 * stepper('wagh') // => [65, 0.646466348785907]
 */
function step (fnGen, seed) {
  // Determine if its already wrapped by alea, or not
  const aSeed = Object.prototype.hasOwnProperty.call(seed, 'next')
    ? seed
    : alea(seed)
  const [{ value }, resultSeed] = fnGen.step(aSeed)


  return [value, resultSeed]
}

/**
 * @name map
 * @function
 * @since v0.1.0
 * @category Function
 * @sig RandomGenerators[] -> [RandomGenerator[], Seed]
 * @description Creates a single generator out of many, also supports nesting multiple maps
 * @param {RandomGenerator[]} list The Array of Generators we are going to map through
 * @returns {[RandomGenerator, Seed]} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import random from 'randoscando'
 *
 * random.step(random.map([
 *   random.int(1, 100),
 *   random.int(1, 100),
 *   random.int(1, 100)
 * ]), 'abc123') // => [[99, 12, 50], 0.49460635893046856]
 */
function map (list) {
  return {
    value: list,
    step (seed) {
      const [results, finalSeed] = list.reduce(([acc, currSeed], fn) => {
        const [value, nextSeed] = step(fn, currSeed)

        acc.push(value)

        return [acc, nextSeed]
      }, [[], seed.next()])

      return [map(results), finalSeed]
    }
  }
}

/**
 * @name int
 * @function
 * @since v0.1.0
 * @category Function
 * @sig number -> number -> RandomGenerator
 * @description Creates a random number generator that will stay between the provided min and max
 * @param {Number} min The minimum the number can be
 * @param {Number} max The maximum the number can be
 * @returns {[RandomGenerator, Seed]} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import random from 'randoscando
 *
 * random.step(random.int(1, 100), 'abc123') // => [90, 0.8986478650476784]
 * random.step(random.int(1, 100), 'wagh') // => [65, 0.646466348785907]
 *
 * // int is also curried
 * const int = random.int(1)
 *
 * random.step(int(100), 'abc123') // => [90, 0.8986478650476784]
 */
function int (min, max) {
  return {
    value: max,
    step (seed) {
      const nextSeed = seed.next()

      return [int(min, Math.floor(nextSeed * (max - min + 1)) + min), nextSeed]
    }
  }
}

/**
 * @name float
 * @function
 * @since v0.1.0
 * @category Function
 * @sig number -> number -> RandomGenerator
 * @description Creates a random number generator that will stay between the provided min and max
 * @param {Number} min The minimum the number can be
 * @param {Number} max The maximum the number can be
 * @returns {[RandomGenerator, Seed]} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import random from 'randoscando
 *
 * random.step(random.float(0, 1), 'abc123') // => [0.8986478650476784, 0.8986478650476784]
 *
 * // float is also curried
 * const float = random.float(0)
 *
 * random.step(float(1), 'abc123') // => [0.8986478650476784, 0.8986478650476784]
 */
function float (min, max) {
  return {
    value: max,
    step (seed) {
      const nextSeed = seed.next()

      return [float(min, nextSeed * (max - min) + min), nextSeed]
    }
  }
}

/**
 * @name weighted
 * @function
 * @since v0.1.0
 * @category Function
 * @sig [any, Number][] -> RandomGenerator
 * @description Takes a list of weighted values and creates a generator to pick one
 * @param {[any, Number][]} list An array of weighted values
 * @returns {[RandomGenerator, Seed]} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import random from 'randoscando'
 *
 * random.step(random.weighted([
    ['a', 20],
    ['b', 20],
    ['c', 20],
    ['d', 20],
    ['e', 20],
  ]), 'abc123') // => ['d', 0.8987810940016061]
 */
function weighted ([a, ...rest]) {
  return {
    value: a[0],
    step (seed) {
      if (K.isEmpty(rest)) {
        return [weighted([[a]]), seed.next()]
      }
      const [, firstWeight] = a
      const total = Math.abs(firstWeight) + K.sum(K.map(([_, weight]) => Math.abs(weight), rest))
      let [countdown] = step(float(1, total), seed)

      for (const [val, prob] of [a, ...rest]) {
        countdown -= prob

        if (countdown <= prob) {
          return [weighted([[val]]), seed.next()]
        }
      }

      return [weighted([[a]]), seed.next()]
    }
  }
}

function uniform ([a, ...list]) {
  return {
    value: a,
    step (seed) {
      if (K.isEmpty(list)) {
        return [uniform([a]), seed.next()]
      }

      const full = [a, ...list]
      const weight = 100 / full.length
      const [result, resultingSeed] = step(weighted(K.map(v => [v, weight], full)), seed)

      return [uniform([result]), resultingSeed]
    }
  }
}

function letter (def = 'A') {
  return {
    value: def,
    step (seed) {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const [chosen, choicesSeed] = step(uniform(letters), seed)

      return [letter(chosen), choicesSeed]
    }
  }
}

function pair (genOne, genTwo) {
  return {
    value: [genOne, genTwo],
    step (seed) {
      return [pair(step(genOne, seed.next()), step(genTwo, seed.next())), seed.next()]
    }
  }
}

function list (len, gen) {
  return {
    value: len,
    step (seed) {
      const results = []
      let currSeed = seed.next()

      for (let i = 0; i < len; i++) {
        const [val, nextSeed] = step(gen, currSeed)

        results.push(val)
        currSeed = nextSeed
      }

      return [list(results), seed.next()]
    }
  }
}

export default {
  int: _curry2(int),
  float: _curry2(float),
  list: _curry2(list),
  pair: _curry2(pair),
  step: _curry2(step),
  initialSeed,
  map,
  letter,
  uniform,
  weighted
}
