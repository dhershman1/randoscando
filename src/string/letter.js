import step from '../function/step.js'
import uniform from '../number/uniform.js'

/**
 * @name letter
 * @function
 * @since v0.1.0
 * @category String
 * @sig string|undefined -> RandomGenerator
 * @description Takes a list of values gives them all equal weight, and picks one
 * @param {String} def A value to set the value of letter to on creation of the generator (defaults to 'A')
 * @returns {Array} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import { letter, step } from 'randoscando'
 *
 * step(letter(), 'abc123') // => ['W', 0.8987810940016061]
 */
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

export default letter
