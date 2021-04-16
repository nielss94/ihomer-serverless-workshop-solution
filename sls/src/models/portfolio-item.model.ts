import {Currency} from './currency.model';

export interface PortfolioItem {
  currency: Currency;
  amount: number;
}
