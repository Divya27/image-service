require('dotenv').config();

const { S3Client } = require('@aws-sdk/client-s3');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const config = {
  region: process.env.AWS_REGION,
  endpoint: process.env.LOCALSTACK_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
};

const s3Client = new S3Client(config);
const dynamoClient = new DynamoDBClient(config);
const docClient = DynamoDBDocumentClient.from(dynamoClient);

module.exports = {
  s3Client,
  docClient,
};