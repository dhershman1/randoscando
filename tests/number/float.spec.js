import test from 'tape'
import step from '../../src/function/step.js'
import float from '../../src/number/float.js'

test('float()', t => {
  t.same(step(float(0, 1), 'abc123'), [0.8986478650476784, 0.8986478650476784])
  t.same(step(float(0, 2), 'abc123'), [1.7972957300953567, 0.8986478650476784])
  t.same(step(float(0, 3), 'abc123'), [2.695943595143035, 0.8986478650476784])

  t.end()
})
