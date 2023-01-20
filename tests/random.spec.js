import test from 'tape'
import random from '../_internal/random.js'

test('random.num()', t => {
  t.same(random.num(20, 'abc123'), [17, 0.8986478650476784])
  t.same(random.num(20, 'abc'), [19, 0.9722709273919463])
  t.end()
})

test('random.minNum()', t => {
  t.same(random.minNum(1, 100, 'abc123'), [90, 0.8986478650476784])
  t.same(random.minNum(1, 100, 'abc'), [98, 0.9722709273919463])
  t.same(random.minNum(8, 10, 'abc123'), [10, 0.8986478650476784])

  t.end()
})

test('random.pick()', t => {
  t.same(random.pick('abc123', 'ahhhh'), ['3', 0.8598122051917017])
  t.same(random.pick([1, 2, 3], 'abc'), [3, 0.9722709273919463])
  t.end()
})

test('random.letter()', t => {
  t.same(random.letter('abc123'), ['Z', 0.9875701994169503])
  t.same(random.letter(0.9875701994169503), ['M', 0.49460635893046856])
  t.end()
})

test('random.pieces()', t => {
  console.log(random.pieces(['line', 'zip'], { line: ['hello', 'world', 'zoooop'], zip: [44444, 55555, 66666] }, 'abc123'))
  t.same(
    random.pieces(['line', 'zip'], { line: ['hello', 'world', 'zoooop'], zip: [44444, 55555, 66666] }, 'abc123'), ['zoooop 66666', 0.9875701994169503]
  )
  t.end()
})

test('random.probability()', t => {
  t.same(random.probability([
    ['hello', 0.5],
    ['world', 0.5]
  ], 'abc123'), 'world')

  t.same(random.probability([
    ['hello', 0.9],
    ['world', 0.1]
  ], 'abc123'), 'hello')
  t.end()
})

test('random.date()', t => {
  const datesTable = { months: ['01', '02', '03'], days: ['12', '09', '20'], years: ['2010', '2023', '2020'] }
  t.same(random.date('M/D/Y', datesTable, 'abc123'), ['03/12/2023', 0.49460635893046856])
  t.same(random.date('M/D/Y', datesTable, 'coolbeans'), ['03/09/2020', 0.9407318972516805])
  t.end()
})
