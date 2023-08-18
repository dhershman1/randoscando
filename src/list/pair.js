import { _curry2 } from '../_internal/curry.js'
import step from '../function/step.js'

/**
 * @name pair
 * @function
 * @since v0.1.0
 * @category List
 * @sig RandomGenerator -> RandomGenerator -> [RandomGenerator, Seed]
 * @description Takes in 2 generators to create a new generator and produce a random pair
 * @param {Function} genOne The first generator function
 * @param {Function} genTwo The second generator function
 * @returns {Array} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import { int, pair, step } from 'randoscando'
 *
 * step(
 *   pair(int(1, 100), int(1, 100)),
 *   'abc123'
 * ) // => [[99, 10], 0.8987810940016061]
 *
 * // pair is curried
 * cosnt fn = pair(int(1, 100))
 *
 * step(fn(int(1, 100)), 'abc123') // => [[99, 10], 0.8987810940016061]
 */
function pair (genOne, genTwo) {
  return {
    value: [genOne, genTwo],
    step (seed) {
      return [pair(step(genOne, seed.next())[0], step(genTwo, seed.next())[0]), seed.next()]
    }
  }
}

export default _curry2(pair)
