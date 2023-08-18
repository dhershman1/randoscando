import test from 'tape'
import step from '../../src/function/step.js'
import pair from '../../src/list/pair.js'
import int from '../../src/number/int.js'
import float from '../../src/number/float.js'

test('pair()', t => {
  t.same(step(
    pair(int(1, 100), int(1, 100)),
    'abc123'
  ), [[99, 10], 0.8987810940016061])

  t.same(step(
    pair(float(1, 100), float(1, 100)),
    'abc123'
  ), [[98.76944974227808, 10.170091815292835], 0.8987810940016061])

  t.end()
})
