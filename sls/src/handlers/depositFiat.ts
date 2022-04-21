import {httpResponse} from '../util/http';
import {CryptoService} from '../services/crypto.service';
import { getWalletClient } from '../util/dynamo';

export const handler = async (event) => {

  const body = JSON.parse(event.body);


  await CryptoService.depositBalance(body.amount)

  const addAmount = body.amount;
  if(!(addAmount > 0 && addAmount < 100)) { 
    return httpResponse(400, {
      message: 'Kapoet'
    });
 }


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

  const walletAmount = wallet?.fiat || 0;
  const newAmount: number = walletAmount + addAmount;
  
  await walletClient
      .update({
          TableName: DYNAMO_TABLE,
          Key: {
              pk: UNIQUE_ID,
          },
          UpdateExpression: 'SET fiat = :amount',
          ExpressionAttributeValues: {
              ':amount': newAmount,
          },
      })
      .promise();

  return httpResponse(200, {
    balance: newAmount
  });
};
