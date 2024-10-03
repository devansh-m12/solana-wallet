'use client'

import React, { useState } from 'react'
import { Keypair as SolanaKeypair } from '@solana/web3.js'
import SolanaWallet from '@/components/keypair'
import Transaction from '@/components/transection'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import StylishHeader from '@/components/header'
import Footer from '@/components/bottom'

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useMemo } from "react";

export default function Home() {
  const [keypair, setKeypair] = useState<SolanaKeypair | null>(null)
  const networkzz = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(networkzz), [networkzz]);

  return (

    <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    <div className="container mx-auto p-4 space-y-8">
                      <StylishHeader />
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-3xl font-bold">Solana Wallet App</CardTitle>
                          <CardDescription>Manage your Solana wallet and transactions on devnet</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                          <SolanaWallet setKeypair={setKeypair} />
                          {keypair && <Transaction keypair={keypair} />}
                        </CardContent>
                      </Card>
                      <Footer />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
  )
}