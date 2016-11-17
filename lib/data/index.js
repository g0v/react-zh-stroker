(function(){
  var fromXML, packedFromPath, fromBinary, fromScanline, computeLength, storke;
  fromXML = require('fromXML');
  packedFromPath = require('packedFromPath');
  fromBinary = require('fromBinary');
  fromScanline = require('fromScanline');
  computeLength = require('computeLength');
  storke = require('storke');
  module.exports = {
    fromXML: fromXML,
    packedFromPath: packedFromPath,
    fromBinary: fromBinary,
    fromScanline: fromScanline,
    computeLength: computeLength,
    storke: storke
  };
}).call(this);
