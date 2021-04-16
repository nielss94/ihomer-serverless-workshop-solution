import axios from 'axios';
import { BASE_API_URL } from '../constants';

export class FiatService {
    static async getBalance(): Promise<number> {
        return (await axios.get(BASE_API_URL + 'fiat')).data.balance as number;
    }

    static async deposit(amount: number): Promise<number> {
        return (
            await axios.put(BASE_API_URL + 'fiat/deposit', {
                amount,
            })
        ).data.balance as number;
    }
}
