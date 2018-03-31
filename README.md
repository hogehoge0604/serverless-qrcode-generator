# Serverless QR Code Generator

Generate QR Code by use of serverless framework

## Installation

If yet serverless framework install. Please install from the following URL
https://serverless.com/framework/docs/providers/aws/guide/installation/

1. Clone `serverless-qrcode-generator` from github
```bash
git clone https://github.com/hogehoge0604/serverless-qrcode-generator.git
```
OR
```bash
wget https://github.com/hogehoge0604/serverless-qrcode-generator/archive/master.zip -O serverless-qrcode-generator.zip
unzip serverless-qrcode-generator.zip
```

2. Execute npm command
```bash
cd serverless-qrcode-generator
npm install
```

3. Edit config file
```bash
vim conf/custom.js

module.exports = () => {
  return {
    bucket: 'S3 Bucket Name',
    region: 'S3 Region',
    apikey: 'API key name',

    // Access-Control-Allow-Origin
    origin: '*',
  }
}
```

4. Deploy
```bash
serverless deploy
```

## Usage

### Create QR Code

```bash
curl -X POST ${API_URL} --header 'x-api-key: ${API_KEY}' --data '{ "message" : "Create QR Code" }'
```

Json result.
```
{
    "filename": "File name",
    "message": "Output of qrcode succeeded.",
    "url": "S3 URL"
}
```

### Delete QR Code

```bash
curl -X DELETE ${API_URL}?filename=${FILE_NAME} --header 'x-api-key: ${API_KEY}'
```

Json result.
```
{
    "filename": "File name",
    "message": "Successfully deleted qrcode."
}
```

### Get QR Code
Access S3 and get the file

## Close
```bash
serverless remove
```

attention:
If exists a file in S3 bucket, an error will occur.

## License
The MIT License
