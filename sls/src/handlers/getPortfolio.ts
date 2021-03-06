import {httpResponse} from '../util/http';
import {getWalletClient} from '../util/dynamo';

export const handler = async (event) => {

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
  return httpResponse(200, wallet.coins);
};
