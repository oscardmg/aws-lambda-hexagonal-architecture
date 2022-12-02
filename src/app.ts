import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

const getStocksRequest = require('./adapters/GetStocksRequest');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  try {
    const stockID = event.pathParameters?.StockID || '1';
    const response = await getStocksRequest(stockID);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
