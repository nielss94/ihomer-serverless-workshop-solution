import {getDynamoClient} from "../util/dynamo";
import {Wallet} from "../models/wallet.model";
import {CoinService} from "./coin.service";

export class WalletService {
    static async get(walletId: string): Promise<Wallet> {
        try {
            const result = await getDynamoClient()
            .get({
                TableName: 'wallet',
                Key: {
                    pk: walletId,
                },
            })
            .promise();
            return result.Item as Wallet;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async list(): Promise<Wallet[]> {
        try {
            const result = await getDynamoClient()
                .scan({
                    TableName: 'wallet'
                })
                .promise();
            return result.Items as Wallet[];
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async enrich(wallet: Wallet, selectionSetList: string[]): Promise<void> {
        if (selectionSetList.includes('portfolio/coin')) {
            try {
                const portfolioCoinRequests = wallet.portfolio.map(
                    async (portfolio) => ({ ...portfolio, coin: await CoinService.get(portfolio.coinId) })
                );
                wallet.portfolio = await Promise.all(portfolioCoinRequests);
            } catch (e) {
                console.log(e);
            }
        }
    }
}
