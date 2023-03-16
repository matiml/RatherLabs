'use client'
import { Web3ReactProvider } from '@web3-react/core';
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import './../styles/tailwind.css';
import { getLibrary } from './config/web3';



export default function RootLayout({ children }) {
  return (
    <html lang='en'>
    <head />
    <body>
      <CacheProvider>
        <ChakraProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          {children}
        </Web3ReactProvider>
        </ChakraProvider>
      </CacheProvider>
    </body>
  </html>
  )
}
