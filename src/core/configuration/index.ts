const isDevelopment = () => process.env.NODE_ENV === 'development'
const isProduction = () => process.env.NODE_ENV === 'production'

const getBaseUrl = () => {
  const isServer = typeof window !== 'undefined'
  const isVercel = process.env.VERCEL_URL
  const port = process.env.PORT ?? 3000

  if (isServer) {
    return ''
  }

  if (isVercel) {
    return `https://${process.env.NEXTAUTH_URL}`
  }

  return `http://localhost:${port}`
}

export const Configuration = {
  isDevelopment,
  isProduction,
  getBaseUrl,
}
