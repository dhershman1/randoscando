import K from 'kyanite'
import test from 'tape'
import random from '../index.js'

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
  t.same(random.map([
    random.int(1, 5),
    random.float(0, 2)
  ], 'abc123'), [[5, 1.9751403988339007], 0.8987810940016061])
  t.same(random.map([
    random.int(1, 5),
    random.float(0, 2)
  ], 'waaaa'), [[2, 0.0943715781904757], 0.21161161735653877])
  t.same(random.map([
    random.int(5, 100),
    random.float(0, 4)
  ], 'abc123'), [[91, 3.9502807976678014], 0.8987810940016061])

  t.end()
})

test('random.letter()', t => {
  t.same(random.step(random.letter(), 'abc123'), ['W', 0.8987810940016061])
  t.same(random.step(random.letter(), 'waaaa'), ['E', 0.21161161735653877])

  t.end()
})

test('random.weighted()', t => {
  t.same(random.step(random.weighted([
    ['hello', 50],
    ['world', 50]
  ]), 'abc123'), ['hello', 0.8987810940016061])
  t.same(random.step(random.weighted([
    ['hello', 10],
    ['world', 80]
  ]), 'abc123'), ['world', 0.8987810940016061])

  t.end()
})

test('random.uniform()', t => {
  const data = K.range(1, 1000)

  t.same(random.step(random.uniform(data), 'abc123'), [897, 0.8987810940016061])
  t.same(random.step(random.uniform(data), 'waaaa'), [211, 0.21161161735653877])
  t.same(random.step(random.uniform(data), 'supercoolseed'), [828, 0.8298104661516845])

  t.end()
})
