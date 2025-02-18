import { ChainId } from '@dodoex/api';
export { etherTokenAddress, basicTokenMap } from '@dodoex/api';

export const rpcServerMap: {
  [key in ChainId]: Array<string>;
} = {
  [ChainId.MAINNET]: [
    'https://rpc.ankr.com/eth',
    'https://eth-mainnet.public.blastapi.io',
    'https://eth-rpc.gateway.pokt.network',
    'https://main-rpc.linkpool.io',
  ],
  [ChainId.GOERLI]: ['https://gateway.tenderly.co/public/goerli'],
  [ChainId.BSC]: [
    'https://bsc-dataseed1.binance.org',
    'https://bsc-dataseed2.binance.org',
    'https://bsc-dataseed3.binance.org',
  ],
  [ChainId.POLYGON]: [
    'https://polygon-rpc.com',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.quiknode.pro',
    'https://poly-rpc.gateway.pokt.network',
    'https://rpc.ankr.com/polygon',
  ],
  [ChainId.ARBITRUM_ONE]: [
    'https://arb1.arbitrum.io/rpc',
    'https://rpc.ankr.com/arbitrum',
  ],
  [ChainId.AURORA]: ['https://mainnet.aurora.dev/'],
  [ChainId.OKCHAIN]: [
    'https://exchainrpc.okex.org',
    'https://okc-mainnet.gateway.pokt.network/v1/lb/6275309bea1b320039c893ff',
  ],
  [ChainId.OPTIMISM]: [
    'https://mainnet.optimism.io',
    'https://optimism-mainnet.public.blastapi.io',
  ],
  [ChainId.AVALANCHE]: [
    'https://api.avax.network/ext/bc/C/rpc',
    'https://rpc.ankr.com/avalanche',
    'https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc',
  ],
  [ChainId.CONFLUX]: ['https://evm.confluxrpc.com'],
  [ChainId.BASE]: ['https://mainnet.base.org'],
  [ChainId.LINEA]: ['https://rpc.linea.build'],
  [ChainId.SCROLL]: ['https://rpc.scroll.io'],
  [ChainId.MANTA]: ['https://pacific-rpc.manta.network/http'],
  [ChainId.MANTLE]: ['https://rpc.mantle.xyz'],
  [ChainId.SEPOLIA]: ['https://ethereum-sepolia-rpc.publicnode.com'],
  [ChainId.DODO_CHAIN_TESTNET]: ['https://dodochain-testnet.alt.technology'],
  [ChainId.TAIKO]: ['https://rpc.mainnet.taiko.xyz'],
};
export const getRpcSingleUrlMap = (newRpcServerMap?: {
  [chainId: number]: string[];
}) => {
  const result = {} as {
    [key in ChainId]?: string;
  };
  Object.entries(rpcServerMap).forEach(([key, urls]) => {
    const chainId = Number(key) as ChainId;
    const urlsResult = newRpcServerMap?.[chainId] || urls;
    const [url] = urlsResult;
    if (url) {
      result[chainId] = url;
    }
  });
  return result as {
    [key in ChainId]: string;
  };
};

export const scanUrlDomainMap: {
  [key in ChainId]: string;
} = {
  [ChainId.MAINNET]: 'etherscan.io',
  [ChainId.GOERLI]: 'goerli.etherscan.io',
  [ChainId.OPTIMISM]: 'optimistic.etherscan.io',
  [ChainId.CONFLUX]: 'snowtrace.io',
  [ChainId.BSC]: 'bscscan.com',
  [ChainId.OKCHAIN]: 'www.oklink.com/okexchain',
  [ChainId.POLYGON]: 'polygonscan.com',
  [ChainId.ARBITRUM_ONE]: 'arbiscan.io',
  [ChainId.AURORA]: 'aurorascan.dev',
  [ChainId.AVALANCHE]: 'snowtrace.io',
  [ChainId.BASE]: 'basescan.org',
  [ChainId.LINEA]: 'lineascan.build',
  [ChainId.SCROLL]: 'scrollscan.com',
  [ChainId.MANTA]: 'pacific-explorer.manta.network',
  [ChainId.MANTLE]: 'explorer.mantle.xyz',
  [ChainId.SEPOLIA]: 'sepolia.etherscan.io',
  [ChainId.DODO_CHAIN_TESTNET]: 'dodochain-testnet-explorer.alt.technology',
  [ChainId.TAIKO]: 'taikoscan.io',
};

export const ThegraphKeyMap: {
  [key in ChainId]: string;
} = {
  [ChainId.BSC]: 'bsc',
  [ChainId.MAINNET]: 'ethereum-mainnet',
  [ChainId.POLYGON]: 'polygon',
  [ChainId.ARBITRUM_ONE]: 'arbitrum',
  [ChainId.OKCHAIN]: 'okchain',
  [ChainId.OPTIMISM]: 'optimism',
  [ChainId.AURORA]: 'aurora',
  [ChainId.AVALANCHE]: 'avalanche',
  [ChainId.GOERLI]: 'gor',
  [ChainId.CONFLUX]: 'cfx',
  [ChainId.BASE]: 'base',
  [ChainId.LINEA]: 'linea',
  [ChainId.SCROLL]: 'scr',
  [ChainId.MANTA]: 'manta',
  [ChainId.MANTLE]: 'mantle',
  [ChainId.SEPOLIA]: 'sepolia',
  [ChainId.DODO_CHAIN_TESTNET]: 'dodochain-testnet',
  [ChainId.TAIKO]: 'taiko',
};

export const blockTimeMap: {
  [key in ChainId]: number;
} = {
  [ChainId.MAINNET]: 12000,
  [ChainId.GOERLI]: 12000,
  [ChainId.OPTIMISM]: 12000,
  [ChainId.CONFLUX]: 3000,
  [ChainId.BSC]: 3000,
  [ChainId.OKCHAIN]: 4000,
  [ChainId.POLYGON]: 2200,
  [ChainId.ARBITRUM_ONE]: 12000,
  [ChainId.AURORA]: 1000,
  [ChainId.AVALANCHE]: 1000,
  [ChainId.BASE]: 2000,
  [ChainId.LINEA]: 2000,
  [ChainId.SCROLL]: 3000,
  [ChainId.MANTA]: 10000,
  [ChainId.MANTLE]: 2000,
  [ChainId.SEPOLIA]: 12000,
  [ChainId.DODO_CHAIN_TESTNET]: 12000,
  [ChainId.TAIKO]: 48000,
};

export const dexKeysMap: {
  [key in ChainId]: string[];
} = {
  [ChainId.MAINNET]: [],
  [ChainId.GOERLI]: [],
  [ChainId.OPTIMISM]: [],
  [ChainId.CONFLUX]: [],
  [ChainId.BSC]: [],
  [ChainId.OKCHAIN]: [],
  [ChainId.POLYGON]: [],
  [ChainId.ARBITRUM_ONE]: [],
  [ChainId.AURORA]: [],
  [ChainId.AVALANCHE]: [],
  [ChainId.BASE]: [],
  [ChainId.LINEA]: [],
  [ChainId.SCROLL]: [],
  [ChainId.MANTA]: [],
  [ChainId.MANTLE]: [],
  [ChainId.SEPOLIA]: [],
  [ChainId.DODO_CHAIN_TESTNET]: [],
  [ChainId.TAIKO]: [],
};
