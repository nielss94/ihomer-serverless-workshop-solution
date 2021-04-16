import React, { useEffect, useState } from 'react';
import { CoinsOverview } from '../components/coins-overview/CoinsOverview';
import { Title } from '../components/global/Title';
import { HomeHero } from '../components/home-hero/HomeHero';
import { MainLayout } from '../layout/MainLayout';
import { useCoinsStore } from '../state/useCoinsStore';

interface Props {}

export function Home(props: Props) {
    const coins = useCoinsStore((state) => state.coins);
    const isLoading = useCoinsStore((state) => state.isLoading);
    const error = useCoinsStore((state) => state.error);
    const refreshCoins = useCoinsStore((state) => state.refresh);

    useEffect(() => {
        const refreshInterval = setInterval(async () => {
            await refreshCoins();
        }, 2000);
        return () => {
            clearInterval(refreshInterval);
        };
    }, []);

    return (
        <div>
            <HomeHero />
            <MainLayout>
                <div className="shadow-md bg-light p-4 mt-4">
                    <Title>Coins</Title>
                    <div className="mt-2">
                        <CoinsOverview
                            coins={coins}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                </div>
            </MainLayout>
        </div>
    );
}
