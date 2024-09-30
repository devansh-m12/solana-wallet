# Solana Wallet Project

## Overview

This project is a web-based Solana wallet application built with modern web technologies. It provides users with a user-friendly interface to manage their Solana tokens, view transactions, and interact with the Solana blockchain.

## Features

- User-friendly interface with a responsive design
- Wallet creation and management
- Transaction history viewing
- Token balance display
- Ability to send and receive Solana tokens
- Integration with Solana blockchain

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Project Structure

- `src/app/(home)/page.tsx`: Main home page component
- `src/app/home/page.tsx`: Alternative home page (if applicable)
- `src/components/`:
  - `header.tsx`: Header component
  - `bottom.tsx`: Bottom navigation or footer component
  - `keypair.tsx`: Component for managing keypairs
  - `transection.tsx`: Transaction component (note: consider renaming to "transaction.tsx")
  - `ui/tabs.tsx`: Reusable tabs component
- `src/hooks/use-toast.ts`: Custom hook for managing toast notifications

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
