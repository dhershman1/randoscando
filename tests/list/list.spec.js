import test from 'tape'
import step from '../../src/function/step.js'
import list from '../../src/list/list.js'
import int from '../../src/number/int.js'
import letter from '../../src/string/letter.js'

test('list()', t => {
  t.same(
    step(
      list(5, int(1, 100)),
      0.5891141295433044
    ), [[2, 62, 12, 56, 23], 0.09485918842256069]
  )

  t.same(step(
    list(10, letter()),
    'abc123'
  ), [
    ['Y', 'N', 'C', 'U', 'N', 'F', 'H', 'D', 'O', 'A'],
    0.8987810940016061
  ])

  t.end()
})
