import test from 'tape'
import step from '../../src/function/step.js'
import englishLetter from '../../src/string/englishLetter.js'

test('englishLetter()', t => {
  t.same(step(englishLetter(), 'abc123'), ['X', 0.8987810940016061])
  t.same(step(englishLetter(), 'waaaa'), ['F', 0.21161161735653877])

  t.end()
})
