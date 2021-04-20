import React from 'react';
import { CryptoCoin } from '../../models/Currency';
import { CoinRow } from './CoinRow';
import { CoinHeader } from './CoinHeader';
import { isNil } from 'lodash';

interface Props {
    coins: CryptoCoin[];
    isLoading: boolean;
    error?: string | null;
    mode?: 'Buy' | 'Sell';
}

export function CoinsOverview({
    coins,
    isLoading,
    error,
    mode = 'Buy',
}: Props) {
    return (
        <div>
            <CoinHeader mode={mode} />

            {!isNil(error) && (
                <div className="p-2 bg-red-200 rounded my-2">{error}</div>
            )}

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {coins.length === 0 && <div>No coins found</div>}
                    {coins.map((coin) => (
                        <CoinRow mode={mode} key={coin.id} coin={coin} />
                    ))}
                </>
            )}
        </div>
    );
}
