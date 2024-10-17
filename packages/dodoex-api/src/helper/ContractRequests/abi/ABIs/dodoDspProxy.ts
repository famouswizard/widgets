import type { ContractInterface } from '@ethersproject/contracts';

const abi: ContractInterface = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'dspFactory',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'gspFactory',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: 'weth',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'dodoApproveProxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    inputs: [],
    name: '_DODO_APPROVE_PROXY_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_DSP_FACTORY_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_GSP_FACTORY_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_WETH_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'dspAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'baseInAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quoteInAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'baseMinAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quoteMinAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'flag',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'deadLine',
        type: 'uint256',
      },
    ],
    name: 'addDSPLiquidity',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'baseAdjustedInAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quoteAdjustedInAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'baseToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'quoteToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'baseInAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quoteInAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lpFeeRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'mtFeeRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'i',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'k',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'priceLimit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadLine',
        type: 'uint256',
      },
    ],
    name: 'createDODOGasSavingPair',
    outputs: [
      {
        internalType: 'address',
        name: 'newGasSavingPair',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'baseToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'quoteToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'baseInAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quoteInAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lpFeeRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'i',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'k',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isOpenTWAP',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'deadLine',
        type: 'uint256',
      },
    ],
    name: 'createDODOStablePair',
    outputs: [
      {
        internalType: 'address',
        name: 'newDODOStablePair',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
];

export default abi;
