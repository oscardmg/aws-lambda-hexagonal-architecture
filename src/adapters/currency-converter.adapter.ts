import { CurrencyConverterPort } from '../ports/currency-converter.port';

const axios = require('axios');

const API_KEY = process.env.API_KEY;

export class CurrencyConverterAdapter implements CurrencyConverterPort {
  async getCurrencies(currencies: string[]) {
    try {
      // replace with  URL from the service
      const res = await axios.get(
        `http://api.mysite.com?access_key=${API_KEY}&symbols=${currencies.toString()}`
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
}
