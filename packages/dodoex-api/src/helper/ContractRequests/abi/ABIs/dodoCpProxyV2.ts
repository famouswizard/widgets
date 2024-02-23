import type { ContractInterface } from '@ethersproject/contracts';

const abi: ContractInterface = [
  {
    inputs: [
      { internalType: 'address payable', name: 'weth', type: 'address' },
      { internalType: 'address', name: 'cpFactory', type: 'address' },
      {
        internalType: 'address',
        name: 'dodoApproveProxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    inputs: [],
    name: '_CP_FACTORY_',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_DODO_APPROVE_PROXY_',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_WETH_',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'cpAddress', type: 'address' },
      { internalType: 'uint256', name: 'quoteAmount', type: 'uint256' },
      { internalType: 'uint8', name: 'flag', type: 'uint8' },
      { internalType: 'uint256', name: 'deadLine', type: 'uint256' },
    ],
    name: 'bid',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'baseToken', type: 'address' },
      { internalType: 'address', name: 'quoteToken', type: 'address' },
      { internalType: 'uint256', name: 'baseInAmount', type: 'uint256' },
      { internalType: 'uint256[]', name: 'timeLine', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'valueList', type: 'uint256[]' },
      { internalType: 'bool[]', name: 'switches', type: 'bool[]' },
      { internalType: 'uint256', name: 'deadLine', type: 'uint256' },
    ],
    name: 'createCrowdPooling',
    outputs: [
      {
        internalType: 'address payable',
        name: 'newCrowdPooling',
        type: 'address',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
];

export default abi;
