import {CoinService} from "../../services/coin.service";

export const handler = async ({ info: {selectionSetList}}) => {
    const coins = await CoinService.list();

    return coins;
};
