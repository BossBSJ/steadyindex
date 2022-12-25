import AppHeader from './components/AppHeader';
import {Box}  from '@mui/material';
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultWallets,
    RainbowKitProvider,
    Chain
} from '@rainbow-me/rainbowkit';
import {
    chain,
    configureChains,
    createClient,
    WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import avaxLogo from './assets/avaxLogo.svg'
import { ThemeProvider as MaterialThemeProvider } from '@mui/material'
import theme from './theme';
import AppRoutes from './Routes';
import './App.css'
import bg from './assets/bg.png'

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
  testnet: true,
};

const { chains, provider } = configureChains(
    [avalancheChain],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: 'Steady Index',
    chains
});

const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider
})


function App() {
  return (
    <Box 
      // sx={{
      //   backgroundImage: `url(${bg})`, 
      //   backgroundSize: 'cover', 
      //   backgroundRepeat: 'no-repeat', 
      //   backgroundAttachment: 'fixed'
      // }}
    >
      <MaterialThemeProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} modalSize="compact">
            <AppHeader/>
            <AppRoutes/>
          </RainbowKitProvider>
        </WagmiConfig>
      </MaterialThemeProvider>
    </Box>

  );
}

export default App;
