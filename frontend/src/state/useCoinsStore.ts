import create, {State} from 'zustand';
import {CryptoCoin} from '../models/Currency';
import {CoinsService} from '../services/coins.service';

interface CoinsState extends State {
    coins: CryptoCoin[];
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

// Initial fetch
CoinsService.getCoins()
    .then((coins: CryptoCoin[]) => {
        useCoinsStore.setState({
            coins,
            isLoading: false,
            error: null,
        });
    })
    .catch(() => {
        useCoinsStore.setState({
            coins: [],
            isLoading: false,
            error: 'Oops something went wrong',
        });
    });

export const useCoinsStore = create<CoinsState>((set, get) => ({
    coins: [],
    isLoading: true,
    error: null,
    refresh: async () => {
        try {
            const coins = await CoinsService.getCoins();
            set(() => ({ coins, error: null }));
        } catch (e) {
            set(() => ({ coins: [], error: 'Oops something went wrong' }));
        }
    },
}));
