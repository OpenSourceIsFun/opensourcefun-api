const { ASTAR_MAINNET_RPC_PROVIDER } = process.env;

export const astarProvider = ASTAR_MAINNET_RPC_PROVIDER;

export const networks = {
  ['Astar']: {
    rpcUrl: ASTAR_MAINNET_RPC_PROVIDER || 'https://evm.astar.network',
    name: 'Astar Network Mainnet',
    chainId: 592
  }
};
