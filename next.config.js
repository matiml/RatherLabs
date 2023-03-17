/** @type {import('next').NextConfig} */
const { parsed: localEnv } = require('dotenv').config()
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    MY_VARIABLE: localEnv.MY_VARIABLE,
    ANOTHER_VARIABLE: localEnv.ANOTHER_VARIABLE
  }
}

module.exports = nextConfig
