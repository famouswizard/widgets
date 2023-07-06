import { ChainId } from './chains';

export enum APIServiceKey {
  routePrice = 'routePrice',
  fiatPrice = 'fiatPrice',
  bridgeRoutePrice = 'bridgeRoutePrice',
  bridgeEncode = 'bridgeEncode',
  bridgeCreateRoute = 'bridgeCreateRoute',
}

export type APIServices = {
  [key in APIServiceKey]: string;
};

export const AppUrl = `https://app.dodoex.io`;

export const getCGTokenListAPI = (chainId: ChainId) => {
  const defaultCGAPI = 'https://tokens.coingecko.com/uniswap/all.json';
  const cgAPIMap: any = {
    [ChainId.ARBITRUM_ONE]:
      'https://tokens.coingecko.com/arbitrum-one/all.json',
    [ChainId.AURORA]: 'https://tokens.coingecko.com/aurora/all.json',
    [ChainId.BSC]: 'https://tokens.coingecko.com/binance-smart-chain/all.json',
  };
  return cgAPIMap[chainId] || defaultCGAPI;
};

const BridgeUrlPrefix = 'https://api.dodoex.io/cross-chain/widget';

export const RoutePriceAPI = `https://api.dodoex.io/route-service/v2/widget/getdodoroute`;
export const FiatPriceAPI = `https://api.dodoex.io/frontend-price-api`;
export const BridgeRoutePriceAPI = `${BridgeUrlPrefix}/routes`;
export const BridgeEncodeAPI = `${BridgeUrlPrefix}/transaction/encode`;
export const BridgeCreateRouteAPI = `${BridgeUrlPrefix}/order/create`;

export function getAPIService(
  key: APIServiceKey,
  serviceProps: Partial<APIServices> = {},
) {
  switch (key) {
    case APIServiceKey.routePrice:
      return serviceProps.routePrice ?? RoutePriceAPI;
    case APIServiceKey.fiatPrice:
      return serviceProps.fiatPrice ?? FiatPriceAPI;
    case APIServiceKey.bridgeRoutePrice:
      return serviceProps.bridgeRoutePrice ?? BridgeRoutePriceAPI;
    case APIServiceKey.bridgeEncode:
      return serviceProps.bridgeEncode ?? BridgeEncodeAPI;
    case APIServiceKey.bridgeCreateRoute:
      return serviceProps.bridgeCreateRoute ?? BridgeCreateRouteAPI;

    default:
      throw new Error(`Invalid key = ${key}`);
  }
}
