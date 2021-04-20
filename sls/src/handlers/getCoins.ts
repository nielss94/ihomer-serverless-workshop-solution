import {httpResponse} from '../util/http';
import {CryptoService} from '../services/crypto.service';

export const handler = async (event) => {

  try {
    const coins = await CryptoService.getCoins();
    return httpResponse(200, coins);
  }
  catch (e) {
    return httpResponse(400, e);
  }
};
