equal = (a, b) ->
  Math.abs(a - b) < (Number.EPSILON || 2.2204460492503130808472633361816e-16)

module.exports = equal
