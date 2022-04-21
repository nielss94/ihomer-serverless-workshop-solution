import {httpResponse} from '../util/http';
import {CryptoService} from '../services/crypto.service';
import { getWalletClient } from '../util/dynamo';

export const handler = async (event) => {

  const body = JSON.parse(event.body);
  console.log(body);
  
  try {
    const sellResult = await CryptoService.sellCoin(body)
    
    const {DYNAMO_TABLE = '', UNIQUE_ID = ''} = process.env;
    const walletClient = getWalletClient();
    
    const result = await walletClient
        .get({
            TableName: DYNAMO_TABLE,
            Key: {
                pk: UNIQUE_ID,
            },
        })
        .promise();
    
    const wallet = result.Item;

    const walletCoins = wallet?.coins || [];
    
    const newCoins = walletCoins.map(coin => {
      if (coin.id === body.coinId) {
        coin.amount -= body.amount;
      }
      return coin;
    })

    if (!newCoins.some(c => c.id === body.coinId)) {
      newCoins.push({
        id: body.coinId,
        amount: body.amount
      })
    }
    
    await walletClient
        .update({
            TableName: DYNAMO_TABLE,
            Key: {
                pk: UNIQUE_ID,
            },
            UpdateExpression: 'SET coins = :coins',
            ExpressionAttributeValues: {
                ':coins': newCoins
            },
        })
        .promise();


    await walletClient
    .update({
        TableName: DYNAMO_TABLE,
        Key: {
            pk: UNIQUE_ID,
        },
        UpdateExpression: 'SET fiat = :fiat',
        ExpressionAttributeValues: {
            ':fiat': sellResult.walletFiat
        },
    })
    .promise();


    return httpResponse(200, sellResult);
  }
  catch (e) {
    return httpResponse(400, e);
  }
};
