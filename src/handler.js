'use strict';

const QR_CREATE = require('./create.js');
const QR_DELETE = require('./delete.js');

module.exports.create = (event, context, callback) => {
  QR_CREATE(event, (status, result) => {
    const response = {
      statusCode: status,
      headers: {
        "Access-Control-Allow-Origin" : process.env.ALLOW_ORIGIN
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  })
}

module.exports.delete = (event, context, callback) => {
  QR_DELETE(event, (status, result) => {
    const response = {
      statusCode: status,
      headers: {
        "Access-Control-Allow-Origin" : process.env.ALLOW_ORIGIN
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  })
}
