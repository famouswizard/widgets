import { ChainId } from './chain';

export const etherTokenAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

const DEFAULT_BASIC_TOKEN = {
  symbol: 'ETH',
  address: etherTokenAddress,
  name: 'Ether',
  decimals: 18,
  showDecimals: 4,
  wrappedTokenSymbol: 'WETH',
};
export const basicTokenMap: {
  [key in ChainId]: typeof DEFAULT_BASIC_TOKEN & {
    wrappedTokenAddress: string;
  };
} = {
  [ChainId.MAINNET]: {
    ...DEFAULT_BASIC_TOKEN,
    wrappedTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  },
  [ChainId.GOERLI]: {
    ...DEFAULT_BASIC_TOKEN,
    wrappedTokenAddress: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  },
  [ChainId.SEPOLIA]: {
    ...DEFAULT_BASIC_TOKEN,
    wrappedTokenAddress: '0x7B07164ecFaF0F0D85DFC062Bc205a4674c75Aa0',
  },
  [ChainId.OPTIMISM]: {
    ...DEFAULT_BASIC_TOKEN,
    wrappedTokenAddress: '0x4200000000000000000000000000000000000006',
  },
  [ChainId.CONFLUX]: {
    ...DEFAULT_BASIC_TOKEN,
    symbol: 'CFX',
    name: 'CFX',
    wrappedTokenSymbol: 'WCFX',
    wrappedTokenAddress: '0x14b2d3bc65e74dae1030eafd8ac30c533c976a9b',
  },
  [ChainId.BSC]: {
    ...DEFAULT_BASIC_TOKEN,
    symbol: 'BNB',
    name: 'BNB',
    wrappedTokenSymbol: 'WBNB',
    wrappedTokenAddress: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  },
  [ChainId.OKCHAIN]: {
    ...DEFAULT_BASIC_TOKEN,
    symbol: 'OKT',
    name: 'OKT',
    wrappedTokenSymbol: 'WOKT',
    wrappedTokenAddress: '0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15',
  },
  [ChainId.POLYGON]: {
    ...DEFAULT_BASIC_TOKEN,
    symbol: 'MATIC',
    name: 'MATIC',
    showDecimals: 6,
    wrappedTokenSymbol: 'WMATIC',
    wrappedTokenAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  },
  [ChainId.ARBITRUM_ONE]: {
    ...DEFAULT_BASIC_TOKEN,
    name: 'Ethereum',
    showDecimals: 6,
    wrappedTokenAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  },
  [ChainId.AURORA]: {
    ...DEFAULT_BASIC_TOKEN,
    name: 'Ethereum',
    showDecimals: 6,
    wrappedTokenAddress: '0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB',
  },
  [ChainId.AVALANCHE]: {
    ...DEFAULT_BASIC_TOKEN,
    symbol: 'AVAX',
    name: 'Avalanche',
    showDecimals: 6,
    wrappedTokenSymbol: 'WAVAX',
    wrappedTokenAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  },
  [ChainId.BASE]: {
    ...DEFAULT_BASIC_TOKEN,
    wrappedTokenSymbol: 'WETH',
    wrappedTokenAddress: '0x4200000000000000000000000000000000000006',
  },
  [ChainId.LINEA]: {
    ...DEFAULT_BASIC_TOKEN,
    wrappedTokenSymbol: 'WETH',
    wrappedTokenAddress: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
  },
  [ChainId.SCROLL]: {
    ...DEFAULT_BASIC_TOKEN,
    wrappedTokenSymbol: 'WETH',
    wrappedTokenAddress: '0x5300000000000000000000000000000000000004',
  },
  [ChainId.MANTA]: {
    ...DEFAULT_BASIC_TOKEN,
    wrappedTokenSymbol: 'WETH',
    wrappedTokenAddress: '0x0Dc808adcE2099A9F62AA87D9670745AbA741746',
  },
  [ChainId.MANTLE]: {
    ...DEFAULT_BASIC_TOKEN,
    wrappedTokenSymbol: 'WMNT',
    wrappedTokenAddress: '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
  },
  [ChainId.DODO_CHAIN_TESTNET]: {
    ...DEFAULT_BASIC_TOKEN,
    symbol: 'dodo',
    name: 'Wrapped Berd',
    wrappedTokenSymbol: 'WBERD',
    wrappedTokenAddress: '0x3a64Ec3606FF7310E8fAd6FcC008e39705fB496d',
  },
  [ChainId.TAIKO]: {
    ...DEFAULT_BASIC_TOKEN,
    wrappedTokenSymbol: 'WMNT',
    wrappedTokenAddress: '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
  },
};
