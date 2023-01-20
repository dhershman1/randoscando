import K from 'kyanite'
import generateSeed, { alea } from './_internal/alea.js'
import { _curry2, _curry3 } from './_internal/curry.js'

function step (fnGen, seed) {
  const aSeed = alea(seed)

  return fnGen.step(aSeed)
}

/**
 * Generates a random number that will be no more than the provided maximum
 * @param {Number} max The maximum the number can be
 * @param {String} seed The seed to generate the data
 * @returns {Number} A random number
 */
function num (max, seed) {
  const nextSeed = generateSeed(seed).quick()

  return [Math.floor(nextSeed * max), nextSeed]
}

function int (min, max) {
  return {
    value: max,
    step (seed) {
      const nextSeed = seed.next()

      return [int(min, Math.floor(nextSeed * max)).value, nextSeed]
    }
  }
}

/**
 * Generates a random float style number that will stay below the provided maximum
 * @param {Number} max The maximum the number can be
 * @param {String|Number} seed The seed to generate the data
 * @returns {Number} A random float style number
 */
function float (max, seed) {
  const nextSeed = generateSeed(seed).quick()

  return [nextSeed * max, nextSeed]
}

/**
 * Generates a random number between a min and max limit
 * @param {Number} min The minimum the number can be
 * @param {Number} max The maximum the number can be
 * @param {String} seed The seed to generate the data
 * @returns {Number} A random number between the min and max provided
 */
function minNum (min, max, seed) {
  const nextSeed = generateSeed(seed).quick()

  return [Math.floor(nextSeed * (max - min + 1)) + min, nextSeed]
}

/**
 * Pulls out a random value from a provided array
 * @param {Any[]} items An array of data items
 * @param {String} seed The seed to generate the data
 * @returns {Any} A random value picked from the provided array
 */
const pick = _curry2(function pick (items, seed) {
  const [i, nextSeed] = num(items.length, seed)

  return [
    items[i],
    nextSeed
  ]
})

/**
 * Takes an array of random based functions which expect a seed, and pipes through them properly to transform data
 * @param {Function[]} fns An array of random based functions (functions using seeds) to pipe through
 * @param {String} seed The seed to generate the data
 * @returns {Any} The final product of the pipe transformation
 */
function seeder (fns, seed) {
  return fns.reduce(([acc, currSeed], f) => {
    const [d, fSeed] = f(currSeed)

    acc.push(d)

    return [acc, fSeed]
  }, [[], seed])
}

/**
 * Generate a random letter from A-Z
 * @param {String} seed The seed to generate the data
 * @returns {String} A letter from A-Z
 */
function letter (seed) {
  const nextSeed = generateSeed(seed).quick()
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  return pick(letters, nextSeed)
}

/**
 * Piece together sets of data into a single string useful for things like an address
 * If a key isn't found it will be skipped and the string will continue to be created
 * The key provided must link to an array of some kind to pick out of
 * @param {String[]} keys An array of strings which are keys in the tables object
 * @param {Object} tables The tables of data to pull from and create things with
 * @param {String} seed A seed used to keep things consistent
 * @returns {String} A pieced together string of random values based on the keys provided
 */
function pieces (keys, tables, seed) {
  return keys.reduce(([acc, currSeed], k) => {
    if (!K.has(k, tables)) {
      return acc
    }

    const [val, nextSeed] = pick(tables[k], currSeed)

    if (acc === '') {
      acc += val
    } else {
      acc += ` ${val}`
    }

    return [acc, nextSeed]
  }, ['', seed])
}

/**
 * Uses basic probability to pull data based on given weights
 * @param {Any[]} list An array of data values from a table
 * @param {String} seed The seed to generate the data
 * @returns {Any} A random value from the given list
 */
function probability (list, seed) {
  let n = generateSeed(seed).quick()

  for (const [item, prob] of list) {
    n = n - prob

    if (n < 0) {
      return [item, generateSeed(n).quick()]
    }
  }
}

/**
 * Performs a uniform probability pick against an Array
 * @param {Any[]} list A list of values to for a uniform probability picker around
 * @param {String|Number} seed The seed to generate the data
 * @returns {[Any, Number]} A new array with the picked value as the first index and a new seed as the second
 */
function uniform ([a = '', ...list], seed) {
  if (K.isEmpty(list)) {
    return [a, generateSeed(seed).quick()]
  }

  const full = [a, ...list]
  const weight = 100 / full.length

  return probability(
    K.map(v => [v, weight], full),
    seed
  )
}

/**
 * Creates a random date string based on the given format
 * @param {String} format The date format we are expecting
 * @param {Object} param1 The date table object holding months, days, and years
 * @param {String} seed The seed to generate the data
 * @returns {String} A random date string formatted based on desired layout
 */
function date (format, { months, days, years }, seed) {
  const dateSeed = generateSeed(seed).quick()
  const [[month, day, year], nextSeed] = seeder([
    pick(months),
    pick(days),
    pick(years)
  ], dateSeed)

  return [
    K.pipe([
      K.replace('M', month),
      K.replace('D', day),
      K.replace('Y', year)
    ], format),
    nextSeed
  ]
}

export default {
  float: _curry2(float),
  num: _curry2(num),
  minNum: _curry3(minNum),
  seeder: _curry2(seeder),
  probability: _curry2(probability),
  date: _curry3(date),
  pieces: _curry3(pieces),
  int: _curry2(int),
  step,
  pick,
  letter,
  uniform
}
