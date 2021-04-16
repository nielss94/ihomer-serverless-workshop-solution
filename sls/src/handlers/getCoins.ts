import {httpResponse} from '../util/http';
import {CryptoService} from '../services/crypto.service';

export const handler = async (event) => {

  const coins = await CryptoService.getCoins();
  return httpResponse(200, coins);
};
