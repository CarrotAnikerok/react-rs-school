'use client'
 
import dynamic from 'next/dynamic'
 
const App = dynamic(() => import('../../components/App/App'), { ssr: false })
 
export function ClientOnly() {
  return (
        <App />
      )
}
