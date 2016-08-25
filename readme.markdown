# snappy-msgpack-stream

[![Build Status](https://travis-ci.org/KlausTrainer/snappy-msgpack-stream.svg?branch=master)](https://travis-ci.org/KlausTrainer/snappy-msgpack-stream)

Streams of framed [Snappy](https://google.github.io/snappy/)-compressed [MessagePack](http://msgpack.org/) messages..

## Usage

``` js
var snappyStream = require('snappy-msgpack-stream');
var encode = snappyStream.createEncodeStream();
var decode = snappyStream.createDecodeStream();

encode.pipe(decode);

decode.on('data', console.log);

encode.write('HELLO');
encode.write({object: true});
encode.write(true);
encode.write({foo: true, bar: 42, baz: null, pow: "wow"});
// encode.write(anyMessagePackSerializableObject);
```

## Limitations

Please note that MessagePack does not support many JavaScript types, like e.g. `Infinity`, or `NaN`. However, we use [msgpack-js](https://www.npmjs.com/package/msgpack-js), which implements a slightly extended MessagePack protocol, and allows encoding and decoding of `Buffer` and `undefined` instances.

## Remarks

This is mostly pulled out of [msgpack-stream](https://www.npmjs.com/package/msgpack-stream).
