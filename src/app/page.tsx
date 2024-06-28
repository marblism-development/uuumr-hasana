'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * @provider Next Router
 * @description The application uses NextJS Router for navigation. You shall use router.push(path) for navigation and links across the pages.
 * @usage `const router = useRouter(); router.push(path); `
 * @function {(path: string) => void} push - Navigate to the path
 * @import import { useRouter, useParams } from 'next/navigation'
 */

export default function App() {
  const router = useRouter()

  useEffect(() => {
    router.push('/home')
  }, [router])

  return <div className="index-page"></div>
}
