import React from 'react';

interface Props {
    mode: 'Buy' | 'Sell'
}
export function CoinHeader({mode}: Props) {
    const columns = ['Cryptocurrency', 'Price'];

    if(mode === 'Sell') {
        columns.push('Amount');
    }

    columns.push('');

    return (
        <div className="flex border-b border-gray-200 py-2">
            {columns.map((column) => (
                <div key={column} className="flex-1">
                    {column}
                </div>
            ))}
        </div>
    );
}
