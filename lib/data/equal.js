(function(){
  var equal;
  equal = function(a, b){
    return Math.abs(a - b) < (Number.EPSILON || 2.2204460492503130808472633361816e-16);
  };
  module.exports = equal;
}).call(this);
