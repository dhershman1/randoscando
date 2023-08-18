import int from '../number/int.js'
import step from '../function/step.js'

/**
 * @name shuffle
 * @function
 * @since v1.0.0
 * @category List
 * @sig list -> RandomGenerator
 * @description Shuffles a provided list into a random order
 * @param {Array|String} list The List data set we are shuffling
 * @returns {Array} An Array pair with a new generator at [0] and the next seed at [1]
 * @example
 * import { shuffle, step } from 'randoscando'
 *
 * const data = [1, 2, 3, 4, 5, 6]
 *
 * step(shuffle(data), 'abc123') // => [[2, 3, 1, 6, 4, 5], 0.7790737589821219]
 */
function shuffle (list) {
  const copiedList = list.slice(0) // Avoid directly mutating the passed in data
  let currentIndex = list.length - 1
  let randomIndex = null
  let t = null

  return {
    value: copiedList,
    step (seed) {
      let currSeed = seed

      while (currentIndex) {
        [randomIndex, currSeed] = step(int(0, currentIndex--), currSeed)

        t = copiedList[currentIndex]
        copiedList[currentIndex] = copiedList[randomIndex]
        copiedList[randomIndex] = t
      }

      return [shuffle(copiedList), currSeed]
    }
  }
}

export default shuffle
