import { _curry2 } from '../_internal/curry.js'

/**
 * @name float
 * @function
 * @since v0.1.0
 * @category Number
 * @sig number -> number -> RandomGenerator
 * @description Creates a random number generator that will stay between the provided min and max
 * @param {Number} min The minimum the number can be
 * @param {Number} max The maximum the number can be
 * @returns {Array} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import { float, step } from 'randoscando'
 *
 * step(float(0, 1), 'abc123') // => [0.8986478650476784, 0.8986478650476784]
 *
 * // float is also curried
 * const float = float(0)
 *
 * step(float(1), 'abc123') // => [0.8986478650476784, 0.8986478650476784]
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

export default _curry2(float)
