import K from 'kyanite'
import test from 'tape'
import randoscando from '../index.js'

test('randoscando.initialSeed', t => {
  t.same(randoscando.initialSeed('abc123').next(), 0.8986478650476784)
  t.end()
})

test('randoscando.int()', t => {
  t.same(randoscando.step(randoscando.int(1, 5), 'abc123'), [5, 0.8986478650476784])
  t.same(randoscando.step(randoscando.int(1, 100), 'abc123'), [90, 0.8986478650476784])
  t.same(randoscando.step(randoscando.int(1, 100), 'wagh'), [65, 0.646466348785907])
  t.same(randoscando.step(randoscando.int(90, 100), 'wagh'), [97, 0.646466348785907])
  t.same(randoscando.step(randoscando.int(90, 100), 'abc123'), [99, 0.8986478650476784])

  t.end()
})

test('randoscando.float()', t => {
  t.same(randoscando.step(randoscando.float(0, 1), 'abc123'), [0.8986478650476784, 0.8986478650476784])
  t.same(randoscando.step(randoscando.float(0, 2), 'abc123'), [1.7972957300953567, 0.8986478650476784])
  t.same(randoscando.step(randoscando.float(0, 3), 'abc123'), [2.695943595143035, 0.8986478650476784])

  t.end()
})

test('randoscando.map()', t => {
  t.same(randoscando.step(randoscando.map([
    randoscando.int(1, 100),
    randoscando.int(1, 100),
    randoscando.int(1, 100)
  ]), 'abc123'), [[99, 12, 50], 0.49460635893046856])
  t.same(randoscando.step(randoscando.map([
    randoscando.int(1, 100),
    randoscando.int(1, 100),
    randoscando.float(0, 10)
  ]), 'abc123'), [[99, 12, 4.946063589304686], 0.49460635893046856])

  const nestedResuts = randoscando.step(
    randoscando.map([
      randoscando.map([
        randoscando.int(1, 100),
        randoscando.int(1, 100),
        randoscando.int(1, 100)
      ]),
      randoscando.map([
        randoscando.int(1, 100),
        randoscando.int(1, 100),
        randoscando.int(1, 100)
      ]),
      randoscando.map([
        randoscando.int(1, 100),
        randoscando.int(1, 100),
        randoscando.int(1, 100)
      ])
    ]),
    'abc123'
  )
  t.same(nestedResuts, [[[12, 50, 78], [68, 83, 100], [56, 52, 72]], 0.7106468540150672])
  t.end()
})

test('randoscando.letter()', t => {
  t.same(randoscando.step(randoscando.letter(), 'abc123'), ['W', 0.8987810940016061])
  t.same(randoscando.step(randoscando.letter(), 'waaaa'), ['E', 0.21161161735653877])

  t.end()
})

test('randoscando.weighted()', t => {
  t.same(randoscando.step(randoscando.weighted([
    ['a', 20],
    ['b', 20],
    ['c', 20],
    ['d', 20],
    ['e', 20]
  ]), 'abc123'), ['d', 0.8987810940016061])
  t.same(randoscando.step(randoscando.weighted([
    ['a', 20],
    ['b', 20],
    ['c', 20],
    ['d', 20],
    ['e', 20]
  ]), 'waaa'), ['b', 0.5667258112225682])
  t.same(randoscando.step(randoscando.weighted([
    ['hello', 10],
    ['world', 90]
  ]), 'waaa'), ['world', 0.5667258112225682])

  t.end()
})

test('randoscando.uniform()', t => {
  const data = K.range(1, 1000)

  t.same(randoscando.step(randoscando.uniform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 'abc123'), [8, 0.8987810940016061])
  t.same(randoscando.step(randoscando.uniform(data), 'abc123'), [898, 0.8987810940016061])
  t.same(randoscando.step(randoscando.uniform(data), 'waaaa'), [219, 0.21161161735653877])
  t.same(randoscando.step(randoscando.uniform(data), 'supercoolseed'), [830, 0.8298104661516845])

  t.end()
})

test('randoscando.pair()', t => {
  t.same(randoscando.step(
    randoscando.pair(randoscando.int(1, 100), randoscando.int(1, 100)),
    'abc123'
  ), [[99, 10], 0.8987810940016061])

  t.same(randoscando.step(
    randoscando.pair(randoscando.float(1, 100), randoscando.float(1, 100)),
    'abc123'
  ), [[98.76944974227808, 10.170091815292835], 0.8987810940016061])

  t.end()
})

test('randoscando.list()', t => {
  t.same(
    randoscando.step(
      randoscando.list(5, randoscando.int(1, 100)),
      0.5891141295433044
    ), [[2, 62, 12, 56, 23], 0.09485918842256069]
  )

  t.same(randoscando.step(
    randoscando.list(10, randoscando.letter()),
    'abc123'
  ), [
    ['Y', 'N', 'C', 'U', 'N', 'F', 'H', 'D', 'O', 'A'],
    0.8987810940016061
  ])

  t.end()
})
