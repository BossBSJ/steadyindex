import AppHeader from './components/AppHeader';
import {Box}  from '@mui/material';
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultWallets,
    RainbowKitProvider,
    Chain,
    Theme,
    connectorsForWallets
} from '@rainbow-me/rainbowkit';
import avaxLogo from './assets/avaxLogo.svg'
import { ThemeProvider as MaterialThemeProvider } from '@mui/material'
import theme from './theme';
import AppRoutes from './Routes';
import './App.css'
import AppFooter from './components/AppFooter';
import {
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { chain as wagmiChain } from 'wagmi'
import { goerli } from '@wagmi/chains';


const INFURA_API_KEY = process.env.REACT_APP_INFURA_API_KEY || ''

const avalancheChain: Chain = {
  id: 43_114,
  name: 'Avalanche',
  network: 'avalanche',
  iconUrl: avaxLogo,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: 'https://api.avax.network/ext/bc/C/rpc',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
};

const avalancheFujiChain: Chain = {
  id: 43_113,
  name: 'Fuji',
  network: 'avalancheFuji',
  iconUrl: avaxLogo,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: 'https://api.avax-test.network/ext/bc/C/rpc',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io/' },
    etherscan: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io/' },
  },
};


const { chains, provider, webSocketProvider } = configureChains(
    // [ avalancheChain, avalancheFujiChain, ],
    [ avalancheFujiChain, avalancheChain, wagmiChain.goerli ],
    [
      infuraProvider({
        apiKey: INFURA_API_KEY
      }),
      publicProvider(),
      jsonRpcProvider({
        rpc: (chain) => ({
          http: chain.rpcUrls.default
        }),
      }),
    ],
);

const { wallets } = getDefaultWallets({
    appName: 'Steady Index',
    chains
});

const connectors = connectorsForWallets(wallets)

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider
})

function App() {
  return (
    <MaterialThemeProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider coolMode chains={chains}>
          <AppHeader/>
          <AppRoutes/>
        </RainbowKitProvider>
      </WagmiConfig>
    </MaterialThemeProvider>

  );
}

export default App;
