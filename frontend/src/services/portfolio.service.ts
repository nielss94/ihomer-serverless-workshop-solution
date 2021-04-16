import { CryptoCoin, OwnedCryptoCoin } from '../models/Currency';
import axios from 'axios';
import { BASE_API_URL } from '../constants';

export class PortfolioService {
    static async getPortfolio(): Promise<OwnedCryptoCoin[]> {
        return (await axios.get(BASE_API_URL + 'portfolio'))
            .data as OwnedCryptoCoin[];
    }

    static async buy(coinId: string, amount: number): Promise<CryptoCoin> {
        return (
            await axios.put(BASE_API_URL + 'portfolio/buy', {
                coinId,
                amount,
            })
        ).data as CryptoCoin;
    }

    static async sell(coinId: string, amount: number): Promise<CryptoCoin> {
        return (
            await axios.put(BASE_API_URL + 'portfolio/sell', {
                coinId,
                amount,
            })
        ).data as CryptoCoin;
    }
}
