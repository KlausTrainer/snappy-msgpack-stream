'use strict'

var snappy = require('snappyjs')
var msgpack = require('msgpack-lite')
var lpStream = require('length-prefixed-stream')
var Transform = require('readable-stream/transform')

var msgpackEncodeStream = new Transform({
  objectMode: true,
  transform: function (chunk, encoding, next) {
    next(null, msgpack.encode(chunk))
  }
})

var msgpackDecodeStream = new Transform({
  objectMode: true,
  transform: function (chunk, encoding, callback) {
    callback(null, msgpack.decode(chunk))
  }
})

var snappyCompressStream = new Transform({
  transform: function (chunk, encoding, next) {
    next(null, snappy.compress(chunk))
  }
})

var snappyUncompressStream = new Transform({
  transform: function (chunk, encoding, callback) {
    callback(null, snappy.uncompress(chunk))
  }
})

exports.createEncodeStream = function SnappyMsgpackEncodeStream () {
  msgpackEncodeStream.pipe(snappyCompressStream).pipe(lpStream.encode())
  return msgpackEncodeStream
}

exports.createDecodeStream = function SnappyMsgpackDecodeStream () {
  return lpStream.decode().pipe(snappyUncompressStream).pipe(msgpackDecodeStream)
}
