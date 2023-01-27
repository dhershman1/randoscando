import K from 'kyanite'
import test from 'tape'
import random from '../index.js'

test('random.initialSeed', t => {
  t.same(random.initialSeed('abc123').next(), 0.8986478650476784)
  t.end()
})

test('random.int()', t => {
  t.same(random.step(random.int(1, 5), 'abc123'), [5, 0.8986478650476784])
  t.same(random.step(random.int(1, 100), 'abc123'), [90, 0.8986478650476784])
  t.same(random.step(random.int(1, 100), 'wagh'), [65, 0.646466348785907])
  t.same(random.step(random.int(90, 100), 'wagh'), [97, 0.646466348785907])
  t.same(random.step(random.int(90, 100), 'abc123'), [99, 0.8986478650476784])

  t.end()
})

test('random.float()', t => {
  t.same(random.step(random.float(0, 1), 'abc123'), [0.8986478650476784, 0.8986478650476784])
  t.same(random.step(random.float(0, 2), 'abc123'), [1.7972957300953567, 0.8986478650476784])
  t.same(random.step(random.float(0, 3), 'abc123'), [2.695943595143035, 0.8986478650476784])

  t.end()
})

test('random.map()', t => {
  t.same(random.step(random.map([
    random.int(1, 100),
    random.int(1, 100),
    random.int(1, 100)
  ]), 'abc123'), [[99, 12, 50], 0.49460635893046856])
  t.same(random.step(random.map([
    random.int(1, 100),
    random.int(1, 100),
    random.float(0, 10)
  ]), 'abc123'), [[99, 12, 4.946063589304686], 0.49460635893046856])

  const nestedResuts = random.step(
    random.map([
      random.map([
        random.int(1, 100),
        random.int(1, 100),
        random.int(1, 100)
      ]),
      random.map([
        random.int(1, 100),
        random.int(1, 100),
        random.int(1, 100)
      ]),
      random.map([
        random.int(1, 100),
        random.int(1, 100),
        random.int(1, 100)
      ])
    ]),
    'abc123'
  )
  t.same(nestedResuts, [[[12, 50, 78], [68, 83, 100], [56, 52, 72]], 0.7106468540150672])
  t.end()
})

test('random.letter()', t => {
  t.same(random.step(random.letter(), 'abc123'), ['W', 0.8987810940016061])
  t.same(random.step(random.letter(), 'waaaa'), ['E', 0.21161161735653877])

  t.end()
})

test('random.weighted()', t => {
  t.same(random.step(random.weighted([
    ['a', 20],
    ['b', 20],
    ['c', 20],
    ['d', 20],
    ['e', 20],
  ]), 'abc123'), ['d', 0.8987810940016061])
  t.same(random.step(random.weighted([
    ['a', 20],
    ['b', 20],
    ['c', 20],
    ['d', 20],
    ['e', 20],
  ]), 'waaa'), ['b', 0.5667258112225682])
  t.same(random.step(random.weighted([
    ['hello', 10],
    ['world', 90]
  ]), 'waaa'), ['world', 0.5667258112225682])

  t.end()
})

test('random.uniform()', t => {
  const data = K.range(1, 1000)

  t.same(random.step(random.uniform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 'abc123'), [8, 0.8987810940016061])
  t.same(random.step(random.uniform(data), 'abc123'), [898, 0.8987810940016061])
  t.same(random.step(random.uniform(data), 'waaaa'), [219, 0.21161161735653877])
  t.same(random.step(random.uniform(data), 'supercoolseed'), [830, 0.8298104661516845])

  t.end()
})

test('random.pair()', t => {
  t.same(random.step(
    random.pair(random.int(1, 100), random.int(1, 100)),
    'abc123'
  ), [[99, 10], 0.8987810940016061])

  t.same(random.step(
    random.pair(random.float(1, 100), random.float(1, 100)),
    'abc123'
  ), [[98.76944974227808, 10.170091815292835], 0.8987810940016061])

  t.end()
})

test('random.list()', t => {
  t.same(
    random.step(
      random.list(5, random.int(1, 100)),
      0.5891141295433044
    ), [[2, 62, 12, 56, 23], 0.09485918842256069]
  )

  t.same(random.step(
    random.list(10, random.letter()),
    'abc123'
  ), [
    ['Y', 'N', 'C', 'U', 'N', 'F', 'H', 'D', 'O', 'A'],
    0.8987810940016061
  ])

  t.end()
})
