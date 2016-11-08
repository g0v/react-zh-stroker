packedFromPath = (filepath) ->
  [, dirpath, idx, id, ext] =
    /(.*)([0-9a-fA-F]{2,})([0-9a-fA-F]{2}).(.*)/.exec filepath
  do
    filepath: "#dirpath#id.#ext"
    index:    parseInt idx, 16

module.exports = packedFromPath
