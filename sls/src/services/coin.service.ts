import {Coin} from '../models/coin.model';
import {getDynamoClient} from "../util/dynamo";


export class CoinService {
    static async list(): Promise<Coin[]> {
        try {
            const result = await getDynamoClient()
                .scan({
                    TableName: 'coins',
                })
                .promise();

            return result.Items as Coin[];
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async get(coinId: string): Promise<Coin> {
        try {
            const result = await getDynamoClient()
            .get({
                TableName: 'coins',
                Key: {
                    pk: coinId,
                },
            })
            .promise();
            return result.Item as Coin;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
