import React from 'react';
import {CryptoCoin, Currency, OwnedCryptoCoin} from '../../models/Currency';
import {Button} from '../global/Button';
import {parseToMoney} from '../../utils/money';
import {BuyCoinPopup} from './BuyCoinPopup';
import {SellCoinPopup} from './SellCoinPopup';

interface Props {
    coin: CryptoCoin | OwnedCryptoCoin;
    mode: 'Buy' | 'Sell';
}

export function CoinRow({coin, mode}: Props) {
    return (
        <div className="flex border-b border-gray-200 py-4">
            <div className="flex-1 flex flex-row items-center">
                <span className="text-2xl bg-gray-200 rounded-full h-14 w-14 flex items-center justify-center pl-0.5">
                    {coin.symbol}
                </span>
                <div className="flex flex-col ml-3">
                    <span className="">{coin.name}</span>
                    <span className="text-gray-500 text-xs">{coin.id}</span>
                </div>
            </div>

            <div className="flex-1 flex items-center">
                ${parseToMoney(coin.price)}
            </div>

            {
                mode === 'Sell' && (
                    <div className="flex-1 flex items-center">
                        {parseToMoney((coin as OwnedCryptoCoin).amount)}
                    </div>
                )
            }

            <div className="flex-1 flex items-center justify-end">
                {mode === 'Buy' && (
                    <BuyCoinPopup
                        coinId={coin.id}
                        trigger={<Button color="secondary">Buy</Button>}
                    />
                )}
                {mode === 'Sell' && (
                    <SellCoinPopup
                        coinId={coin.id}
                        trigger={<Button color="secondary">Sell</Button>}
                    />
                )}
            </div>
        </div>
    );
}
