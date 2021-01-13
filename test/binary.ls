#!/usr/bin/env lsc
require! {
  fs
  '../dist': { data: { packedFromPath, fromBinary } }
}

{ filepath, index } = packedFromPath '../bin/660e.bin'
buffer = fs.readFileSync filepath
err, data <- fromBinary buffer
console.log JSON.stringify(data[index], null, 2)

