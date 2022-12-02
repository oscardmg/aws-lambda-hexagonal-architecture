import { RetrieveStockPort } from '../ports/retrieve-stock.port';

export class RetrieveStock implements RetrieveStockPort {
  async getStockWithCurrencies(stockId: any): Promise<any> {
    let res;

    try {
      const stockData = await HTTPHandler.retrieveStock(stockId);

      res = {
        statusCode: 200,
        body: JSON.stringify({
          message: stockData,
        }),
      };
    } catch (err) {
      console.log(err);
    }

    return res;
  }
}
