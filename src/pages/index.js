import { Inter } from 'next/font/google'
import Layout from '@/layout/Layout'
import Calendar from '@/components/Calendar'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <Layout/>
      <Calendar/>
    </>
  )
}
