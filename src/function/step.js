import { _curry2 } from '../_internal/curry.js'
import { alea } from '../_internal/alea.js'

/**
 * @name step
 * @function
 * @since v0.1.0
 * @category Function
 * @sig { value: any, step: (seed) => Array } -> AleaSeed -> [any, Seed]
 * @description Manually step through a random function in order to generate a value
 * @param {Object} fnGen The Generator function to step through and get a value from
 * @param {Seed} seed The seed we want to use to create the randomness
 * @returns {Array} An array pair with the value at [0] and the next seed at [1]
 * @example
 * import { int, step } from 'randoscando'
 *
 * step(int(1, 100), 'abc123') // => [90, 0.8986478650476784]
 * // Also curried
 * const stepper = step(int(1, 100))
 *
 * stepper('abc123') // => [90, 0.8986478650476784]
 * stepper('wagh') // => [65, 0.646466348785907]
 */
export default _curry2(function (fnGen, seed) {
  // Determine if its already wrapped by alea, or not
  const aSeed = Object.prototype.hasOwnProperty.call(seed, 'next')
    ? seed
    : alea(seed)
  const [{ value }, resultSeed] = fnGen.step(aSeed)

  return [value, resultSeed]
})
