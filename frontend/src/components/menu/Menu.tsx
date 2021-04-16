import React, { useEffect } from 'react';
import { MenuLink } from './MenuLink';
import { parseToMoney } from '../../utils/money';
import { useFiatStore } from '../../state/useFiatStore';

interface Props {}

export function Menu(props: Props) {
    const balance = useFiatStore((state) => state.balance);
    const refreshBalance = useFiatStore((state) => state.refresh);

    useEffect(() => {
        const refreshInterval = setInterval(async () => {
            await refreshBalance();
        }, 2000);
        return () => {
            clearInterval(refreshInterval);
        };
    }, []);

    return (
        <div className="px-4 py-3 shadow-md bg-dark text-light">
            <nav className="flex flex-row items-center">
                <h1 className="flex-initial inline-block text-3xl text-primary font-bold font-mono">
                    iCrypto
                </h1>
                <ul className="flex-initial inline-block ml-10">
                    <MenuLink to={'/'} name={'Home'} />
                    <MenuLink to={'/portfolio'} name={'Portfolio'} />
                </ul>

                <div className="flex-1 text-right">
                    <MenuLink
                        to={'/fiat'}
                        name={parseToMoney(balance, { symbol: '$' })}
                    />
                </div>
            </nav>
        </div>
    );
}
