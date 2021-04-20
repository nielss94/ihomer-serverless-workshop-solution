import React, { useEffect, useState } from 'react';
import { Title } from '../components/global/Title';
import { MainLayout } from '../layout/MainLayout';
import { useCoinsStore } from '../state/useCoinsStore';
import { usePortfolioStore } from '../state/usePortfolioStore';
import { CryptoCoin, OwnedCryptoCoin } from '../models/Currency';
import { isNil, flatten } from 'lodash';
import { parseToMoney } from '../utils/money';
import { CoinsOverview } from '../components/coins-overview/CoinsOverview';

interface Props {}

export function Portfolio(props: Props) {
    const [total, setTotal] = useState(0.0);

    const coins = useCoinsStore((state) => state.coins);
    const portfolio = usePortfolioStore((state) => state.portfolio);
    const refreshPortfolio = usePortfolioStore((state) => state.refresh);

    useEffect(() => {
        const refreshInterval = setInterval(async () => {
            await refreshPortfolio();
        }, 2000);
        return () => {
            clearInterval(refreshInterval);
        };
    }, []);

    useEffect(() => {
        setTotal(
            portfolio.length > 0
                ? portfolio
                      .map((ownedCrypto) => calculatePrice(ownedCrypto))
                      .reduce((a, b) => a + b)
                : 0.0
        );
    }, [coins, portfolio]);

    const calculatePrice = (ownedCrypto: OwnedCryptoCoin) => {
        const coin: CryptoCoin | undefined = coins.find(
            (coin) => coin.id === ownedCrypto.id
        );

        if (isNil(coin)) {
            return 0.0;
        }

        return ownedCrypto.amount * coin.price;
    };

    return (
        <MainLayout>
            <Title className="mb-4">Portfolio</Title>

            <Title className="text-4xl mb-4">
                {parseToMoney(total, { symbol: '$' })}
            </Title>

            <div className="shadow-md bg-light p-4 mt-4">
                <Title>Wallets</Title>
                <div className="mt-2">
                    <CoinsOverview
                        coins={portfolio.map((ownedCrypto) => {
                            return {
                                ...ownedCrypto,
                                price: calculatePrice(ownedCrypto),
                                symbol: coins.find((coin) => coin.id === ownedCrypto.id)?.symbol || '?'
                            };
                        })}
                        isLoading={false}
                        mode={'Sell'}
                    />
                </div>
            </div>
        </MainLayout>
    );
}
