import K from 'kyanite'
import { alea } from './_internal/alea.js'
import { _curry2 } from './_internal/curry.js'

function step (fnGen, seed) {
  const aSeed = alea(seed)

  return fnGen.step(aSeed)
}

function map (randoList, seed) {
  const aSeed = alea(seed)
  const [results] = randoList.reduce(([acc, currSeed], r) => {
    const [val, nextSeed] = r.step(currSeed)

    acc.push(val)

    return [acc, alea(nextSeed)]
  }
  , [[], aSeed])

  return [results, aSeed.next()]
}

/**
 * Generates a random number that will be no more than the provided maximum
 * @param {Number} min The minimum the number can be
 * @param {Number} max The maximum the number can be
 * @returns {Object} A Generator Object { value: a, step: GeneratorFunction }
 */
function int (min, max) {
  return {
    value: max,
    step (seed) {
      const nextSeed = seed.next()

      return [int(min, Math.floor(nextSeed * (max - min + 1)) + min).value, nextSeed]
    }
  }
}

function float (min, max) {
  return {
    value: max,
    step (seed) {
      const nextSeed = seed.next()

      return [float(min, nextSeed * (max - min) + min).value, nextSeed]
    }
  }
}

function weighted ([a, ...rest]) {
  return {
    value: a[0],
    step (seed) {
      if (K.isEmpty(rest)) {
        return [a, seed.next()]
      }
      const [, firstWeight] = a
      const total = firstWeight + K.sum(K.map(([_, weight]) => weight, rest))
      let [countdown] = float(0, total).step(seed)

      for (const [val, prob] of [a, ...rest]) {
        countdown -= prob

        if (countdown <= prob) {
          return [weighted([[val]]).value, seed.next()]
        }
      }
    }
  }
}

function uniform ([a, ...list]) {
  return {
    value: a,
    step (seed) {
      if (K.isEmpty(list)) {
        return [a, seed.next()]
      }

      const full = [a, ...list]
      const weight = 100 / full.length

      return weighted(K.map(v => [v, weight], full)).step(seed)
    }
  }
}

function letter (def = 'A') {
  return {
    value: def,
    step (seed) {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const [chosen, choicesSeed] = uniform(letters).step(seed)

      return [letter(chosen).value, choicesSeed]
    }
  }
}

export default {
  int: _curry2(int),
  float: _curry2(float),
  map,
  step,
  letter,
  uniform,
  weighted
}
