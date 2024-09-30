'use client'

import React, { useState } from 'react'
import { Keypair as SolanaKeypair } from '@solana/web3.js'
import SolanaWallet from '@/components/keypair'
import Transaction from '@/components/transection'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import StylishHeader from '@/components/header'
import Footer from '@/components/bottom'
export default function Home() {
  const [keypair, setKeypair] = useState<SolanaKeypair | null>(null)

  return (
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
  )
}