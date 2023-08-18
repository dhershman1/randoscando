import test from 'tape'
import step from '../../src/function/step.js'
import int from '../../src/number/int.js'

test('int()', t => {
  t.same(step(int(1, 5), 'abc123'), [5, 0.8986478650476784])
  t.same(step(int(1, 100), 'abc123'), [90, 0.8986478650476784])
  t.same(step(int(1, 100), 'wagh'), [65, 0.646466348785907])
  t.same(step(int(90, 100), 'wagh'), [97, 0.646466348785907])
  t.same(step(int(90, 100), 'abc123'), [99, 0.8986478650476784])

  t.end()
})
