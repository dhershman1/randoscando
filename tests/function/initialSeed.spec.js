import test from 'tape'
import { initialSeed } from '../../src/index.js'

test('initialSeed', t => {
  t.same(initialSeed('abc123').next(), 0.8986478650476784)
  t.end()
})
