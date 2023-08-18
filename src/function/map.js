import step from './step.js'

/**
 * @name map
 * @function
 * @since v0.1.0
 * @category Function
 * @sig RandomGenerators[] -> [RandomGenerator[], Seed]
 * @description Creates a single generator out of many, also supports nesting multiple maps
 * @param {RandomGenerator[]} list The Array of Generators we are going to map through
 * @returns {Array} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import { int, map, step } from 'randoscando'
 *
 * step(map([
 *   int(1, 100),
 *   int(1, 100),
 *   int(1, 100)
 * ]), 'abc123') // => [[99, 12, 50], 0.49460635893046856]
 */
export default function map (list) {
  return {
    value: list,
    step (seed) {
      const [results, finalSeed] = list.reduce(([acc, currSeed], fn) => {
        const [value, nextSeed] = step(fn, currSeed)

        acc.push(value)

        return [acc, nextSeed]
      }, [[], seed.next()])

      return [map(results), finalSeed]
    }
  }
}
