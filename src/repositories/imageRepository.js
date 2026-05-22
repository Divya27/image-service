const {
  PutCommand,
  ScanCommand,
  GetCommand,
  DeleteCommand,
} = require('@aws-sdk/lib-dynamodb');

const { docClient } = require('../config/aws');

const tableName = process.env.DYNAMODB_TABLE;

exports.saveImageMetadata = async (item) => {
  await docClient.send(
    new PutCommand({
      TableName: tableName,
      Item: item,
    })
  );
};

exports.getImageById = async (imageId) => {
  const result = await docClient.send(
    new GetCommand({
      TableName: tableName,
      Key: {
        imageId,
      },
    })
  );

  return result.Item;
};

exports.deleteImage = async (imageId) => {
  await docClient.send(
    new DeleteCommand({
      TableName: tableName,
      Key: {
        imageId,
      },
    })
  );
};

exports.listImages = async () => {
  const result = await docClient.send(
    new ScanCommand({
      TableName: tableName,
    })
  );

  return result.Items || [];
};