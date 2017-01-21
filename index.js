'use strict'

var snappy = require('snappyjs')
var msgpack = require('msgpack-lite')
var lpStream = require('length-prefixed-stream')
var stream = require('stream')
var pumpify = require('pumpify')

var snappyCompressStream = new stream.Transform({
  transform: function (chunk, encoding, next) {
    next(null, snappy.compress(chunk))
  }
})

var snappyUncompressStream = new stream.Transform({
  transform: function (chunk, encoding, callback) {
    callback(null, snappy.uncompress(chunk))
  }
})

exports.createEncodeStream = function SnappyMsgpackEncodeStream () {
  return pumpify.obj(
    pumpify.obj(msgpack.createEncodeStream(), snappyCompressStream),
    lpStream.encode())
}

exports.createDecodeStream = function SnappyMsgpackDecodeStream () {
  return pumpify.obj(
    pumpify.obj(lpStream.decode(), snappyUncompressStream),
    msgpack.createDecodeStream())
}
