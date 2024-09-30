export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white mt-8">
        <div className="container mx-auto py-4 px-4 text-center">
          <p className="text-sm">
            Created by <a href="https://github.com/devansh-12" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">Devansh</a>
          </p>
          <p className="text-xs mt-1 text-gray-400">
            A decentralized Solana wallet for managing your assets on the devnet
          </p>
        </div>
      </footer>
    )
  }