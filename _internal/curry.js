/**
 * This is an optimized internal curry function for 2 param functions
 * @private
 * @category Function
 * @param {Function} fn The function to curry
 * @return {Function} The curried function
 */
export function _curry2 (fn) {
  return function f2 (a, b) {
    if (!arguments.length) {
      return f2
    }

    if (arguments.length === 1) {
      return function (_b) {
        return fn(a, _b)
      }
    }

    return fn(a, b)
  }
}

/**
 * This is an optimized internal curry function for 3 param functions
 * @private
 * @category Function
 * @param {Function} fn The function to curry
 * @return {Function} The curried function
 */
export function _curry3 (fn) {
  return function f3 (a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3
      case 1:
        return _curry2(function (_b, _c) {
          return fn(a, _b, _c)
        })
      case 2:
        return function (_c) {
          return fn(a, b, _c)
        }
      default:
        return fn(a, b, c)
    }
  }
}

/**
 * This is an optimized internal curry function for 4 param functions
 * @private
 * @category Function
 * @param {Function} fn The function to curry
 * @return {Function} The curried function
 */
export function _curry4 (fn) {
  return function f4 (a, b, c, d) {
    switch (arguments.length) {
      case 0:
        return f4
      case 1:
        return _curry3(function (_b, _c, _d) {
          return fn(a, _b, _c, _d)
        })
      case 2:
        return _curry2(function (_c, _d) {
          return fn(a, b, _c, _d)
        })
      case 3:
        return function (_d) {
          return fn(a, b, c, _d)
        }
      default:
        return fn(a, b, c, d)
    }
  }
}
