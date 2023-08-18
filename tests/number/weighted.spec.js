import test from 'tape'
import step from '../../src/function/step.js'
import weighted from '../../src/number/weighted.js'

test('weighted()', t => {
  t.same(step(weighted([
    ['a', 20],
    ['b', 20],
    ['c', 20],
    ['d', 20],
    ['e', 20]
  ]), 'abc123'), ['d', 0.8987810940016061])
  t.same(step(weighted([
    ['a', 20],
    ['b', 20],
    ['c', 20],
    ['d', 20],
    ['e', 20]
  ]), 'waaa'), ['b', 0.5667258112225682])
  t.same(step(weighted([
    ['hello', 10],
    ['world', 90]
  ]), 'waaa'), ['world', 0.5667258112225682])

  t.end()
})
