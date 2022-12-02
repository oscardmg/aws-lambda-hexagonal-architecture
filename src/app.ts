import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { CurrencyConverterAdapter } from './adapters/currency-converter.adapter';
import { StockRepositoryAdapter } from './adapters/stock-repository.adapter';
import { GetCurrencyUseCase } from './application/get-currency.usecase';

const getStocksRequest = require('./adapters/GetStocksRequest');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  try {
    const useCase = new GetCurrencyUseCase(
      new CurrencyConverterAdapter(),
      new StockRepositoryAdapter()
    );

    const stockID = event.pathParameters?.StockID || '1';
    const response = await useCase.getCurrency(stockID);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
