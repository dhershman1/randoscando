import step from '../function/step.js'
import { _curry2 } from '../_internal/curry.js'

/**
 * @name list
 * @function
 * @since v0.1.0
 * @category List
 * @sig number -> RandomGenerator -> RandomGenerator
 * @description Creates a Random Generator responsible for building a random list of the desired length using the desired generator function
 * @param {Number} len A number value to tell list how many values to place in the array
 * @param {RandomGenerator} gen The Random Generator we want to use to populate the array with
 * @returns {RandomGeneratorResponse} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import { letter, list, step } from 'randoscando'
 *
 * step(list(10, letter()),'abc123') // => [['Y', 'N', 'C', 'U', 'N', 'F', 'H', 'D', 'O', 'A'], 0.8987810940016061]
 */
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

export default _curry2(list)
