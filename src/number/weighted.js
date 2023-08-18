import { sum, map, isEmpty } from 'kyanite'
import float from './float.js'
import step from '../function/step.js'

/**
 * @name weighted
 * @function
 * @since v0.1.0
 * @category Number
 * @sig [any, Number][] -> RandomGenerator
 * @description Takes a list of weighted values and creates a generator to pick one
 * @param {Array} list An array of weighted values
 * @returns {Array} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import { step, weighted } from 'randoscando'
 *
 * step(weighted([
 *    ['a', 20],
 *    ['b', 20],
 *    ['c', 20],
 *    ['d', 20],
 *    ['e', 20],
 *  ]), 'abc123') // => ['d', 0.8987810940016061]
 */
function weighted ([a, ...rest]) {
  return {
    value: a[0],
    step (seed) {
      if (isEmpty(rest)) {
        return [weighted([[a]]), seed.next()]
      }
      const [, firstWeight] = a
      const total = Math.abs(firstWeight) + sum(map(([_, weight]) => Math.abs(weight), rest))
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

export default weighted
