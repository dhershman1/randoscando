import uniform from '../number/uniform.js'
import step from './step.js'

/**
 * @name bool
 * @function
 * @since v1.0.0
 * @category Function
 * @sig Boolean? -> RandomGenerator
 * @description Generates a random boolean value
 * @param {Boolean?} def A boolean value defaults to true
 * @returns {Array} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import { bool, step } from 'randoscando'
 *
 * step(bool(), 'abc123') // => [false, 0.8987810940016061]
 */
export default function bool (def = true) {
  return {
    value: def,
    step (seed) {
      const [chosen, nextSeed] = step(uniform([true, false]), seed)

      return [bool(chosen), nextSeed]
    }
  }
}
