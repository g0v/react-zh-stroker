#!/usr/bin/env lsc
require! {
  fs
  '../lib/data': { packedFromPath, fromBinary }
}

{ filepath, index } = packedFromPath '../bin/660e.bin'
buffer = fs.readFileSync filepath
err, data <- fromBinary buffer
console.log data[index]

