- Start localstack using below command
docker-compose up -d

- Install dependencies using below command
npm install

- Create s3 bucket using below script command
chmod +x scripts/createBucket.sh
./scripts/createBucket.sh

- Create dynamo DB table via script using below command
chmod +x scripts/createTable.sh
./scripts/createTable.

- Start application
npm run dev

- Run tests
npm test