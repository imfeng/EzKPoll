import React from 'react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Profile from './profile';
import Join from './component/Join';

const { publicClient, webSocketPublicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [publicProvider()]
);

const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
});

function App() {
    return (
        <WagmiConfig config={config}>
            <div className="content flex flex-col items-center justify-center">
                <Profile />

            </div>
        </WagmiConfig>
    );
}

export default App;
