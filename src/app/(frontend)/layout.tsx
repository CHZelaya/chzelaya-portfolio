import { SanityLive } from '@/sanity/lib/live'
import '../globals.css'



export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === 'production' && <SanityLive />}
    </>
  )
}