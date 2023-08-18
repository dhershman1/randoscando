import test from 'tape'
import generateSeed, { alea } from '../../src/_internal/alea.js'

test('Alea should produce a seed with next', t => {
  const seed = alea('abc123')

  t.same(seed.next(), 0.8986478650476784)
  t.same(seed.next(), 0.8987810940016061)
  t.end()
})

test('generateSeed().quick() matches Alea next', t => {
  t.same(generateSeed('abc123').quick(), alea('abc123').next())
  t.end()
})
