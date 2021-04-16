import React from 'react';

interface Props {}

export function CoinHeader(props: Props) {
    const columns = ['Cryptocurrency', 'Price', ''];

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
