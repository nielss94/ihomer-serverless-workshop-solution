export interface Wallet {
    pk: string;
    portfolio: { coinId: string; amount: string; }[]
}
