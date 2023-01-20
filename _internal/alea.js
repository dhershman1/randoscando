
// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Converted and imported into JS for use in contractorio

function mash (data) {
  let n = 0xefc8249d
  const strData = String(data)

  for (let i = 0; i < strData.length; i++) {
    n += strData.charCodeAt(i)
    let h = 0.02519603282416938 * n
    n = h >>> 0
    h -= n
    h *= n
    n = h >>> 0
    h -= n
    n += h * 0x100000000 // 2^32
  }
  return (n >>> 0) * 2.3283064365386963e-10 // 2^-32
}

function alea (seed) {
  const rng = {}

  rng.next = function () {
    const t = 2091639 * rng.s0 + rng.c * 2.3283064365386963e-10 // 2^-32
    rng.s0 = rng.s1
    rng.s1 = rng.s2
    rng.s2 = t - (rng.c = t | 0)

    return rng.s2
  }

  // Apply the seeding algorithm from Baagoe.
  rng.c = 1
  rng.s0 = mash(' ')
  rng.s1 = mash(' ')
  rng.s2 = mash(' ')
  rng.s0 -= mash(seed)
  if (rng.s0 < 0) { rng.s0 += 1 }
  rng.s1 -= mash(seed)
  if (rng.s1 < 0) { rng.s1 += 1 }
  rng.s2 -= mash(seed)
  if (rng.s2 < 0) { rng.s2 += 1 }

  return rng
}

function generateSeed (seed) {
  const al = alea(seed)
  const prng = al.next

  prng.int32 = () => (al.next() * 0x100000000) | 0
  prng.double = () => prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16 // 2^-53
  prng.quick = prng

  return prng
}

export default generateSeed
