'use strict'

const AWS = require('aws-sdk');
const S3 = new AWS.S3({ apiVersion: '2006-03-01' });

module.exports = (event, callback) => {

  if(event.queryStringParameters == null
      || typeof event.queryStringParameters.filename === 'undefined'
      || event.queryStringParameters.filename.length === 0) {
    return callback(500, {message: 'Invalid parameters.'});
  }
  
  const filename = event.queryStringParameters.filename;
  
  S3.deleteObject({
    Bucket: process.env.BUCKET,
    Key: filename,
  }, function(err, res) {
    if (err) {
      console.log(err);
      return callback(500, {message: 'Failed to delete qrcode.'});
    }
    return callback(200, {filename: filename, message: 'Successfully deleted qrcode.'});
  });
}
