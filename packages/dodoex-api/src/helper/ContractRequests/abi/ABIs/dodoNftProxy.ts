import type { ContractInterface } from '@ethersproject/contracts';

const abi: ContractInterface = [
  {
    inputs: [
      { internalType: 'address', name: 'cloneFactory', type: 'address' },
      { internalType: 'address payable', name: 'weth', type: 'address' },
      {
        internalType: 'address',
        name: 'dodoApproveProxy',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'defaultMaintainer',
        type: 'address',
      },
      { internalType: 'address', name: 'buyoutModel', type: 'address' },
      {
        internalType: 'address',
        name: 'mtFeeRateModel',
        type: 'address',
      },
      { internalType: 'address', name: 'vaultTemplate', type: 'address' },
      { internalType: 'address', name: 'fragTemplate', type: 'address' },
      { internalType: 'address', name: 'dvmTemplate', type: 'address' },
      { internalType: 'address', name: 'nftRegistry', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'fragment',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Buyout',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newBuyoutModel',
        type: 'address',
      },
    ],
    name: 'ChangeBuyoutModel',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newDvmTemplate',
        type: 'address',
      },
    ],
    name: 'ChangeDvmTemplate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newFragTemplate',
        type: 'address',
      },
    ],
    name: 'ChangeFragTemplate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newMtFeeRateTemplate',
        type: 'address',
      },
    ],
    name: 'ChangeMtFeeRateTemplate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newVaultTemplate',
        type: 'address',
      },
    ],
    name: 'ChangeVaultTemplate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'vault',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'fragment',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'dvm',
        type: 'address',
      },
    ],
    name: 'CreateFragment',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'vault',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'baseURI',
        type: 'string',
      },
    ],
    name: 'CreateNFTCollateralVault',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferPrepared',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    inputs: [],
    name: '_BUYOUT_MODEL_',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_CLONE_FACTORY_',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_DEFAULT_MAINTAINER_',
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
    name: '_DVM_TEMPLATE_',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_FRAG_TEMPLATE_',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_MT_FEE_RATE_MODEL_',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_NEW_OWNER_',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_NFT_REGISTY_',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_OWNER_',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_VAULT_TEMPLATE_',
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
      { internalType: 'address', name: 'fragment', type: 'address' },
      {
        internalType: 'uint256',
        name: 'quoteMaxAmount',
        type: 'uint256',
      },
      { internalType: 'uint8', name: 'flag', type: 'uint8' },
      { internalType: 'uint256', name: 'deadLine', type: 'uint256' },
    ],
    name: 'buyout',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: 'addrList', type: 'address[]' },
      { internalType: 'uint256[]', name: 'params', type: 'uint256[]' },
      { internalType: 'bool', name: 'isOpenTwap', type: 'bool' },
      { internalType: 'string', name: 'fragSymbol', type: 'string' },
    ],
    name: 'createFragment',
    outputs: [
      { internalType: 'address', name: 'newFragment', type: 'address' },
      { internalType: 'address', name: 'newDvm', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'baseURI', type: 'string' },
    ],
    name: 'createNFTCollateralVault',
    outputs: [{ internalType: 'address', name: 'newVault', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'initOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'newBuyoutModel', type: 'address' },
    ],
    name: 'updateBuyoutModel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'newDvmTemplate', type: 'address' },
    ],
    name: 'updateDvmTemplate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newFragTemplate',
        type: 'address',
      },
    ],
    name: 'updateFragTemplate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newMtFeeRateTemplate',
        type: 'address',
      },
    ],
    name: 'updateMtFeeRateTemplate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newVaultTemplate',
        type: 'address',
      },
    ],
    name: 'updateVaultTemplate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export default abi;
