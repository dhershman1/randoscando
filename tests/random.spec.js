import test from 'tape'
import random from '../index.js'

// test('random.num()', t => {
//   t.same(random.num(20, 'abc123'), [17, 0.8986478650476784])
//   t.same(random.num(20, 'abc'), [19, 0.9722709273919463])
//   t.end()
// })

// test('random.float()', t => {
//   t.same(random.float(2, 'abc123'), [1.7972957300953567, 0.8986478650476784])
//   t.same(random.float(2, 'foobar'), [1.6971524031832814, 0.8485762015916407])
//   t.same(random.float(3, 'abc123'), [2.695943595143035, 0.8986478650476784])

//   t.end()
// })

// test('random.minNum()', t => {
//   t.same(random.minNum(1, 100, 'abc123'), [90, 0.8986478650476784])
//   t.same(random.minNum(1, 100, 'abc'), [98, 0.9722709273919463])
//   t.same(random.minNum(8, 10, 'abc123'), [10, 0.8986478650476784])

//   t.end()
// })

// test('random.pick()', t => {
//   t.same(random.pick('abc123', 'ahhhh'), ['3', 0.8598122051917017])
//   t.same(random.pick([1, 2, 3], 'abc'), [3, 0.9722709273919463])
//   t.end()
// })

// test('random.letter()', t => {
//   t.same(random.letter('abc123'), ['Z', 0.9875701994169503])
//   t.same(random.letter(0.9875701994169503), ['M', 0.49460635893046856])
//   t.end()
// })

// test('random.pieces()', t => {
//   t.same(
//     random.pieces(['line', 'zip'], { line: ['hello', 'world', 'zoooop'], zip: [44444, 55555, 66666] }, 'abc123'), ['zoooop 66666', 0.9875701994169503]
//   )
//   t.end()
// })

// test('random.seeder', t => {
//   t.same(random.seeder([
//     random.pick([1, 2, 3, 4]),
//     random.pick([1, 2, 3, 4]),
//     random.pick([1, 2, 3, 4]),
//     random.pick([1, 2, 3, 4]),
//     random.pick([1, 2, 3, 4])
//   ], 'wooopie'), [[3, 1, 1, 4, 2], 0.30550888809375465])

//   t.end()
// })

// test('random.probability()', t => {
//   t.same(random.probability([
//     ['hello', 0.5],
//     ['world', 0.5]
//   ], 'abc123'), ['world', 0.6556187274400145])

//   t.same(random.probability([
//     ['hello', 0.9],
//     ['world', 0.1]
//   ], 'abc123'), ['hello', 0.2178527475334704])
//   t.end()
// })

// test('random.date()', t => {
//   const datesTable = { months: ['01', '02', '03'], days: ['12', '09', '20'], years: ['2010', '2023', '2020'] }
//   t.same(random.date('M/D/Y', datesTable, 'abc123'), ['03/12/2023', 0.49460635893046856])
//   t.same(random.date('M/D/Y', datesTable, 'coolbeans'), ['03/09/2020', 0.9407318972516805])
//   t.end()
// })

test('random.int()', t => {
  const iter = random.int(1, 100)
  console.log(iter)

  console.log(random.step(iter, 'abc123'))
  t.end()
})
