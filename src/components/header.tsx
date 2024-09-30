import { GithubIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StylishHeader() {
  return (
    <header className="bg-black text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              className="w-6 h-6"
            >
              <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
              <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 001.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 001.897 1.384C6.809 12.164 9.315 12.75 12 12.75z" />
              <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 15.914 9.315 16.5 12 16.5z" />
            </svg>
          </div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-2">DRK Wallet</h1>
            <span className="bg-white text-black text-xs font-medium px-2 py-1 rounded-full">
              v1.0
            </span>
          </div>
        </div>
        <Button variant="outline" size="icon" className="bg-white text-black hover:bg-gray-200">
          <a href="https://github.com/devansh-m12/solana-wallet.git" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
            <GithubIcon className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </header>
  )
}