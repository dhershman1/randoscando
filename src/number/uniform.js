import { isEmpty, map } from 'kyanite'
import weighted from './weighted.js'
import step from '../function/step.js'

/**
 * @name uniform
 * @function
 * @since v0.1.0
 * @category Number
 * @sig any[]-> RandomGenerator
 * @description Takes a list of values gives them all equal weight, and picks one
 * @param {any[]} list An array of values to choose from
 * @returns {Array} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import { step, uniform } from 'randoscando'
 *
 * step(uniform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 'abc123') // => [8, 0.8987810940016061]
 */
function uniform ([a, ...list]) {
  return {
    value: a,
    step (seed) {
      if (isEmpty(list)) {
        return [uniform([a]), seed.next()]
      }

      const full = [a, ...list]
      const weight = 100 / full.length
      const [result, resultingSeed] = step(weighted(map(v => [v, weight], full)), seed)

      return [uniform([result]), resultingSeed]
    }
  }
}

export default uniform
