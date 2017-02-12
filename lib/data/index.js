(function(){
  var fromXML, packedFromPath, fromBinary, fromScanline, computeLength, storke, equal;
  fromXML = require('fromXML');
  packedFromPath = require('packedFromPath');
  fromBinary = require('fromBinary');
  fromScanline = require('fromScanline');
  computeLength = require('computeLength');
  storke = require('storke');
  equal = require('equal');
  module.exports = {
    fromXML: fromXML,
    packedFromPath: packedFromPath,
    fromBinary: fromBinary,
    fromScanline: fromScanline,
    computeLength: computeLength,
    storke: storke,
    equal: equal
  };
}).call(this);
