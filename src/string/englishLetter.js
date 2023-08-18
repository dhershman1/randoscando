import step from '../function/step.js'
import uniform from '../number/uniform.js'

/**
 * @name englishLetter
 * @function
 * @since v1.0.0
 * @category String
 * @sig string|undefined -> RandomGenerator
 * @description Takes a list of values gives them all equal weight, and picks one
 * @param {String} def A value to set the value of letter to on creation of the generator (defaults to 'A')
 * @returns {Array} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import { englishLetter, step } from 'randoscando'
 *
 * step(englishLetter(), 'abc123') // => ['W', 0.8987810940016061]
 */
function englishLetter (def = 'A') {
  return {
    value: def,
    step (seed) {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const [chosen, choicesSeed] = step(uniform(letters), seed)

      return [englishLetter(chosen), choicesSeed]
    }
  }
}

export default englishLetter
