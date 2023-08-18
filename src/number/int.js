import { _curry2 } from '../_internal/curry.js'

/**
 * @name int
 * @function
 * @since v0.1.0
 * @category Number
 * @sig number -> number -> RandomGenerator
 * @description Creates a random number generator that will stay between the provided min and max
 * @param {Number} min The minimum the number can be
 * @param {Number} max The maximum the number can be
 * @returns {Array} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import { int, step } from 'randoscando'
 *
 * step(int(1, 100), 'abc123') // => [90, 0.8986478650476784]
 * step(int(1, 100), 'wagh') // => [65, 0.646466348785907]
 *
 * // int is also curried
 * const int = int(1)
 *
 * step(int(100), 'abc123') // => [90, 0.8986478650476784]
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

export default _curry2(int)
