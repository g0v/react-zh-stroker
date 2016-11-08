(function(){
  var packedFromPath;
  packedFromPath = function(filepath){
    var ref$, dirpath, idx, id, ext;
    ref$ = /(.*)([0-9a-fA-F]{2,})([0-9a-fA-F]{2}).(.*)/.exec(filepath), dirpath = ref$[1], idx = ref$[2], id = ref$[3], ext = ref$[4];
    return {
      filepath: dirpath + "" + id + "." + ext,
      index: parseInt(idx, 16)
    };
  };
  module.exports = packedFromPath;
}).call(this);
