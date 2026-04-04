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
      <SanityLive />
    </>
  )
}