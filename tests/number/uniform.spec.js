import test from 'tape'
import { range } from 'kyanite'
import step from '../../src/function/step.js'
import uniform from '../../src/number/uniform.js'

test('uniform()', t => {
  const data = range(1, 1000)

  t.same(step(uniform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 'abc123'), [8, 0.8987810940016061])
  t.same(step(uniform(data), 'abc123'), [898, 0.8987810940016061])
  t.same(step(uniform(data), 'waaaa'), [219, 0.21161161735653877])
  t.same(step(uniform(data), 'supercoolseed'), [830, 0.8298104661516845])

  t.end()
})
