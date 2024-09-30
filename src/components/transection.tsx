'use client'

import React, { useState, useEffect } from 'react'
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL, Transaction as SolanaTransaction, SystemProgram, PublicKey } from '@solana/web3.js'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, RefreshCw, Send, Coins } from "lucide-react"
import { Label } from "@/components/ui/label"

interface TransactionProps {
  keypair: any
}

export default function Transaction({ keypair }: TransactionProps) {
  const [balance, setBalance] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const connection: any = new Connection(clusterApiUrl("devnet"), "confirmed")

  useEffect(() => {
    if (keypair?.publicKey) {
      getBalance()
    }
  }, [keypair])

  const getBalance = async () => {
    try {
      setLoading(true)
      const balance = await connection.getBalance(keypair.publicKey)
      setBalance(balance / LAMPORTS_PER_SOL)
    } catch (err) {
      setError("Failed to fetch balance")
    } finally {
      setLoading(false)
    }
  }

  const getAirdrop = async (amount: number) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)
      const airdropSignature = await connection.requestAirdrop(
        keypair.publicKey,
        amount * LAMPORTS_PER_SOL
      )
      await connection.confirmTransaction({ signature: airdropSignature, commitment: "confirmed" })
      setSuccess(`Successfully airdropped ${amount} SOL`)
      await getBalance()
    } catch (err) {
      setError("Airdrop failed")
    } finally {
      setLoading(false)
    }
  }

  const transferSol = async (amount: number, to: string) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)
      const toPublicKey = new PublicKey(to)
      const transaction = new SolanaTransaction().add(
        SystemProgram.transfer({
          fromPubkey: keypair.publicKey,
          toPubkey: toPublicKey,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      )
      const signature = await connection.sendTransaction(transaction, [keypair])
      await connection.confirmTransaction({ signature: signature, commitment: "confirmed" })
      setSuccess(`Successfully transferred ${amount} SOL to ${to}`)
      await getBalance()
    } catch (err) {
      setError("Transfer failed")
    } finally {
      setLoading(false)
    }
  }

  const handleAirdrop = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const amount = parseFloat((event.currentTarget.elements.namedItem('airdropAmount') as HTMLInputElement).value)
    if (!isNaN(amount)) {
      await getAirdrop(amount)
    }
  }

  const handleTransfer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const amount = parseFloat((event.currentTarget.elements.namedItem('transferAmount') as HTMLInputElement).value)
    const to = (event.currentTarget.elements.namedItem('transferTo') as HTMLInputElement).value
    if (!isNaN(amount) && to) {
      await transferSol(amount, to)
    }
  }

  if (!keypair?.publicKey) return <div>No keypair found</div>

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Solana Transactions</CardTitle>
        <CardDescription>Manage your Solana transactions on devnet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="bg-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Public Key:</p>
                <p className="text-xs break-all">{keypair.publicKey.toBase58()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Balance:</p>
                <p className="text-2xl font-bold">{balance.toFixed(4)} SOL</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            onClick={getBalance} 
            disabled={loading}
            className="w-full"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Refresh Balance
          </Button>
        </motion.div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleAirdrop} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="airdropAmount">Airdrop Amount (SOL)</Label>
                <Input
                  type="number"
                  placeholder="Enter amount of SOL"
                  id="airdropAmount"
                  step="0.1"
                  min="0"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Coins className="mr-2 h-4 w-4" />}
                Request Airdrop
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleTransfer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transferAmount">Transfer Amount (SOL)</Label>
                <Input
                  type="number"
                  placeholder="Enter amount of SOL"
                  id="transferAmount"
                  step="0.1"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transferTo">Recipient's Public Key</Label>
                <Input
                  type="text"
                  placeholder="Enter recipient's public key"
                  id="transferTo"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Transfer SOL
              </Button>
            </form>
          </CardContent>
        </Card>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{

 opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}