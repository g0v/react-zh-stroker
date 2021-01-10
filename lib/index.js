(function(){
  var data, Stroke, Track, Word, out$ = typeof exports != 'undefined' && exports || this;
  data = require('data');
  Stroke = require('Stroke');
  Track = require('Track');
  Word = require('Word');
  out$.data = data;
  out$.Stroke = Stroke;
  out$.Track = Track;
  out$.Word = Word;
}).call(this);
