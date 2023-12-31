import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ParticleAuthConnector, ParticleOptions } from './particleAuth';
import './proflie.scss';
import Poll from './component/Poll';

const particleOptions: ParticleOptions = {
    projectId: process.env.REACT_APP_PROJECT_ID as string,
    clientKey: process.env.REACT_APP_CLIENT_KEY as string,
    appId: process.env.REACT_APP_APP_ID as string,
};

export default function Profile() {
    const { address } = useAccount();
    const { connect } = useConnect({
        connector: new ParticleAuthConnector({
            options: particleOptions,
        }),
    });
    const { disconnect } = useDisconnect();

    return (
        <div className="content-body">
            {address ? (
                <>
                <div>Wallet Address: 
                    <a 
                    className="text-blue-500 hover:underline"
                    target="_blank" href={`https://zksync2-testnet.zkscan.io/address/${address}/transactions`}>{address}</a>
                </div>
                <button className="btn" onClick={() => disconnect()}>
                    Disconnect
                </button>
                </>
            ) : (
                <>
                    <button className="btn" onClick={() => connect()}>
                        Connect Wallet
                    </button>

                    <button
                        className="btn"
                        onClick={() => {
                            connect({
                                connector: new ParticleAuthConnector({
                                    options: particleOptions,
                                    loginOptions: {
                                        preferredAuthType: 'google',
                                    },
                                }),
                            });
                        }}
                    >
                        Google
                    </button>
                    <button
                        className="btn"
                        onClick={() => {
                            connect({
                                connector: new ParticleAuthConnector({
                                    options: particleOptions,
                                    loginOptions: {
                                        preferredAuthType: 'twitter',
                                    },
                                }),
                            });
                        }}
                    >
                        Twitter
                    </button>
                </>
            )}
            {address ? (
                <>
                <Poll></Poll>
                </>
            ): <></>}
        </div>
    );
}
