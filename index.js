'use strict'

var pumpify = require('pumpify')
var through = require('through2')
var msgpack = require('msgpack-lite')
var snappy = require('snappyjs')

module.exports.createEncodeStream = function SnappyMsgpackEncodeStream (stream) {
  var msgEncode = msgpack.createEncodeStream()

  var snappyCompress = through.obj(function (data, enc, next) {
    next(null, snappy.compress(data))
  })

  return pumpify.obj(msgEncode, snappyCompress)
}

module.exports.createDecodeStream = function SnappyMsgpackDecodeStream (stream) {
  var msgDecode = msgpack.createDecodeStream()

  var snappyUncompress = through.obj(function (data, enc, next) {
    next(null, snappy.uncompress(data))
  })

  return pumpify.obj(snappyUncompress, msgDecode)
}
