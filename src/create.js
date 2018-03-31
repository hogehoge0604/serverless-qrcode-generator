'use strict'

const AWS = require('aws-sdk');
const Qrcode = require('qrcode');
const Crypto = require('crypto');
const Stream = require('stream');

const S3 = new AWS.S3({ apiVersion: '2006-03-01' });

module.exports = (event, callback) => {
  let len = 0;

  const filename = Crypto.randomBytes(32).toString('hex') + '.png';
  const inputStream = new Stream.Transform({
    transform(chunk, encoding, callback) {
      len += chunk.length;
      this.push(chunk);
      callback();
    },
  });

  try {
    const params = JSON.parse(event.body);
    Qrcode.toFileStream(inputStream, params.message);
  } catch(err) {
    console.log(err);
    return callback(500, {message: 'Invalid parameters.'});
  }

  inputStream.on('finish', () => {
    inputStream.length = len;
    
    S3.putObject({
      Bucket: process.env.BUCKET,
      Key: filename,
      Body: inputStream,
      ContentType: 'image/png',
      ACL: 'public-read'
    }, function(err, res) {
      if (err) {
        console.log(err);
        return callback(500, {message: 'Failed to output qrcode.'});
      }
      return callback(200, {
        filename: filename, 
        url: process.env.URL + filename, 
        message: 'Output of qrcode succeeded.'
      });
    });
  
  });
}
