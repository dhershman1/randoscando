import test from 'tape'
import step from '../../src/function/step.js'
import englishLetter from '../../src/string/englishLetter.js'

test('englishLetter()', t => {
  t.same(step(englishLetter(), 'abc123'), ['W', 0.8987810940016061])
  t.same(step(englishLetter(), 'waaaa'), ['E', 0.21161161735653877])

  t.end()
})
