import { RepositoryPort } from '../ports/repository.port';

const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-1',
});
const documentClient = new AWS.DynamoDB.DocumentClient();

const DB_TABLE = process.env.DB_TABLE;

export class StockRepositoryAdapter implements RepositoryPort {
  async get(stockID: any): Promise<any> {
    let params = {
      TableName: DB_TABLE,
      Key: {
        STOCK_ID: stockID,
      },
    };

    try {
      const stockData = await documentClient.get(params).promise();
      return stockData;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
