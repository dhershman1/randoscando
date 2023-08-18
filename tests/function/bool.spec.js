import test from 'tape'
import bool from '../../src/function/bool.js'
import step from '../../src/function/step.js'

test('bool()', t => {
  const stepper = step(bool())

  t.same(stepper('abc123'), [false, 0.8987810940016061])
  t.same(stepper('23443452523532'), [true, 0.4405698131304234])

  t.end()
})
