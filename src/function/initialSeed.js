import { alea } from '../_internal/alea.js'

/**
 * @name initialSeed
 * @function
 * @since v0.1.0
 * @category Function
 * @sig (seed) -> AleaSeed
 * @description Creates an initial seed using the alea algorithm
 * @param {Number|String} seed The seed we want to use to create the randomness
 * @returns {Object} A alea object for seed generation and usage
 * @example
 * import { initialSeed } from 'randoscando'
 *
 * initialSeed('abc123') // => AleaSeedObject
 */
export default function initialSeed (seed) {
  return alea(seed)
}
