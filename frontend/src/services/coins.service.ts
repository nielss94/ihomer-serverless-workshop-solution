import { CryptoCoin } from '../models/Currency';
import axios from 'axios';
import { BASE_API_URL } from '../constants';

export class CoinsService {
    static async getCoins(): Promise<CryptoCoin[]> {
        return (
            await axios.get(BASE_API_URL + 'coins')
        ).data.sort((a: CryptoCoin, b: CryptoCoin) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        ) as CryptoCoin[];
    }
}
