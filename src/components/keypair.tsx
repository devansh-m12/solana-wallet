'use client'

import React, { useState, useEffect } from 'react'
import { Keypair as SolanaKeypair } from '@solana/web3.js'
import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import { derivePath } from "ed25519-hd-key"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, PlusCircleIcon, KeyIcon, CopyIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from "@/hooks/use-toast"

interface SolanaWalletProps {
  setKeypair: (keypair: SolanaKeypair) => void;
}

export default function SolanaWallet({ setKeypair }: SolanaWalletProps) {
  const [mnemonic, setMnemonic] = useState<string | null>(null)
  const [wallets, setWallets] = useState<SolanaKeypair[]>([])
  const [showMnemonic, setShowMnemonic] = useState(false)

  useEffect(() => {
    const storedMnemonic = localStorage.getItem("mnemonic")
    if (storedMnemonic) {
      setMnemonic(storedMnemonic)
      const storedWallets = localStorage.getItem("wallets")
      if (storedWallets) {
        setWallets(JSON.parse(storedWallets).map((wallet: any) => SolanaKeypair.fromSecretKey(new Uint8Array(wallet.secretKey))))
      }
    }
  }, [])

  const generateMnemonicFunction = () => {
    if(mnemonic) {
      return
    }
    const newMnemonic = generateMnemonic()
    setMnemonic(newMnemonic)
    localStorage.setItem("mnemonic", newMnemonic)
    setWallets([])
    localStorage.removeItem("wallets")
  }

  const generateWallet = () => {
    if (!mnemonic) {
      generateMnemonicFunction()
      return
    }
    const seedBuffer = mnemonicToSeedSync(mnemonic)
    const nextIndex = wallets.length
    const { key } = derivePath(`m/44'/501'/${nextIndex}'`, Buffer.from(seedBuffer).toString('hex'))
    const newKeypair = SolanaKeypair.fromSeed(key)
    setKeypair(newKeypair)
    const updatedWallets = [...wallets, newKeypair]
    setWallets(updatedWallets)
    localStorage.setItem("wallets", JSON.stringify(updatedWallets.map(wallet => ({
      publicKey: wallet.publicKey.toBase58(),
      secretKey: Array.from(wallet.secretKey)
    }))))
  }

  const toggleShowMnemonic = () => {
    setShowMnemonic(!showMnemonic)
  }

  const copyMnemonic = () => {
    if (mnemonic) {
      navigator.clipboard.writeText(mnemonic)
      toast({
        title: "Mnemonic copied",
        description: "The mnemonic phrase has been copied to your clipboard.",
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Solana Wallet Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button onClick={generateMnemonicFunction} className="w-full" disabled={!!mnemonic}>
            <KeyIcon className="mr-2 h-4 w-4" />
            {mnemonic ? 'Mnemonic Generated' : 'Generate New Mnemonic'}
          </Button>
          {mnemonic && (
            <Card className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Mnemonic Phrase:</h3>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleShowMnemonic}
                    className="mr-2"
                  >
                    {showMnemonic ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyMnemonic}
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {showMnemonic ? mnemonic.split(' ').map((word, index) => (
                  <Card key={index} className="p-2 text-center">
                    <span className="text-sm font-medium">{word}</span>
                  </Card>
                )) : (
                  Array(12).fill('').map((_, index) => (
                    <Card key={index} className="p-2 text-center">
                      <span className="text-sm font-medium">****</span>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          )}
        </div>
        <Button onClick={generateWallet} className="w-full" disabled={!mnemonic}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Generate Wallet
        </Button>
        <AnimatePresence>
          {wallets.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 overflow-hidden"
            >
              <h3 className="font-semibold">Generated Wallets:</h3>
              {wallets.map((wallet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between text-sm bg-secondary p-2 rounded-md"
                >
                  <span className="truncate mr-2">
                    Wallet {index + 1}: {wallet.publicKey.toBase58()}
                  </span>
                  <Button onClick={() => setKeypair(wallet)} size="sm">Select</Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}