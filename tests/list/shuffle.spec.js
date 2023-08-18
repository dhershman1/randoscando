import test from 'tape'
import shuffle from '../../src/list/shuffle.js'
import step from '../../src/function/step.js'

test('shuffle() -- Shuffles basic numbered array', t => {
  const data = [1, 2, 3, 4, 5, 6]
  const result = step(shuffle(data), 'abc123')

  t.same(result, [[2, 3, 1, 6, 4, 5], 0.7790737589821219], 'Gave back shuffled list')
  t.same(data, [1, 2, 3, 4, 5, 6], 'Did not mutate original array')
  t.end()
})

test('shuffle() -- Shuffles basic string array', t => {
  const data = ['1', '2', '3', '4', '5', '6']
  const result = step(shuffle(data), 'abc123')

  t.same(result, [['2', '3', '1', '6', '4', '5'], 0.7790737589821219], 'Gave back shuffled list')
  t.same(data, ['1', '2', '3', '4', '5', '6'], 'Did not mutate original array')
  t.end()
})

test('shuffle() -- Shuffles array of arrays', t => {
  const data = [['1'], ['2'], ['3'], ['4'], ['5'], ['6']]
  const result = step(shuffle(data), 'abc123')

  t.same(result, [[['2'], ['3'], ['1'], ['6'], ['4'], ['5']], 0.7790737589821219], 'Gave back shuffled list')
  t.same(data, [['1'], ['2'], ['3'], ['4'], ['5'], ['6']], 'Did not mutate original array')
  t.end()
})
