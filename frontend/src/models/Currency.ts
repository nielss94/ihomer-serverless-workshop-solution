export interface Currency {
    id: string;
    name: string;
    symbol: string;
}

export interface OwnedCryptoCoin extends Currency {
    amount: number;
    price: number;
}

export interface CryptoCoin extends Currency {
    price: number;
}

export interface Fiat extends Currency {}
