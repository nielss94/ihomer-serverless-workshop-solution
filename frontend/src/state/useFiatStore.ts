import create, { State } from 'zustand';
import { FiatService } from '../services/fiat.service';

interface FiatState extends State {
    balance: number;
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

// Initial fetch
FiatService.getBalance().then((balance: number) => {
    useFiatStore.setState({
        balance,
    });
});

export const useFiatStore = create<FiatState>((set, get) => ({
    balance: 0.0,
    isLoading: true,
    error: null,
    refresh: async () => {
        set(() => ({ isLoading: true, error: null }));

        try {
            const balance = await FiatService.getBalance();
            set(() => ({ balance, error: null }));
        } catch (e) {
            set(() => ({ balance: 0.0, error: 'Oops something went wrong' }));
        }

        set(() => ({ isLoading: false }));
    },
}));
