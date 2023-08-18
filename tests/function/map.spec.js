import test from 'tape'
import { step, map } from '../../src/index.js'
import int from '../../src/number/int.js'
import float from '../../src/number/float.js'

test('map()', t => {
  t.same(step(map([
    int(1, 100),
    int(1, 100),
    int(1, 100)
  ]), 'abc123'), [[99, 12, 50], 0.49460635893046856])
  t.same(step(map([
    int(1, 100),
    int(1, 100),
    float(0, 10)
  ]), 'abc123'), [[99, 12, 4.946063589304686], 0.49460635893046856])

  const nestedResuts = step(
    map([
      map([
        int(1, 100),
        int(1, 100),
        int(1, 100)
      ]),
      map([
        int(1, 100),
        int(1, 100),
        int(1, 100)
      ]),
      map([
        int(1, 100),
        int(1, 100),
        int(1, 100)
      ])
    ]),
    'abc123'
  )
  t.same(nestedResuts, [[[12, 50, 78], [68, 83, 100], [56, 52, 72]], 0.7106468540150672])
  t.end()
})
