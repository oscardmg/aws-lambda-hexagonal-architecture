import { CurrencyConverterPort } from '../ports/currency-converter.port';
import { GetCurrencyPort } from '../ports/get-currency.port';
import { RepositoryPort } from '../ports/repository.port';

const CURRENCIES = ['USD', 'CAD', 'AUD'];

export class GetCurrencyUseCase implements GetCurrencyPort {
  constructor(
    private readonly currencyConverterPort: CurrencyConverterPort,
    private readonly repository: RepositoryPort
  ) {}

  async getCurrency(stockId: string) {
    try {
      const stockValue = await this.repository.get(stockId);
      const currencyList = await this.currencyConverterPort.getCurrencies(
        CURRENCIES
      );

      const stockWithCurrencies = {
        stock: stockValue.STOCK_ID,
        values: {
          EUR: stockValue.VALUE,
        },
      };

      for (const currency in currencyList.rates) {
        stockWithCurrencies.values[currency] = (
          stockValue.VALUE * currencyList.rates[currency]
        ).toFixed(2);
      }

      return stockWithCurrencies;
    } catch (err) {
      return err;
    }
  }
}
