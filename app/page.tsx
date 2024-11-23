import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/saints')
  return null
}
