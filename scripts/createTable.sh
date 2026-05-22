aws --endpoint-url=http://localhost:4566 dynamodb create-table \
  --table-name images-table \
  --attribute-definitions \
      AttributeName=imageId,AttributeType=S \
  --key-schema \
      AttributeName=imageId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST