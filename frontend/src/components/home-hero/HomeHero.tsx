import React from 'react';

interface Props {}

export function HomeHero(props: Props) {
    return (
        <div className="bg-darker pt-10 pb-12 text-light">
            <div className="container m-auto">
                <div className="text-3xl text-center">
                    Buy & sell fake cryptocurrencies
                </div>
                <div className="text-lg text-gray-400 text-center">
                    Join the ihomer serverless workshop!
                </div>
            </div>
        </div>
    );
}
