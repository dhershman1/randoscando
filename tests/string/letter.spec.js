import test from 'tape'
import step from '../../src/function/step.js'
import letter from '../../src/string/letter.js'

test('letter()', t => {
  t.same(step(letter(), 'abc123'), ['W', 0.8987810940016061])
  t.same(step(letter(), 'waaaa'), ['E', 0.21161161735653877])

  t.end()
})
