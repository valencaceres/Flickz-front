import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/layout/Layout'
import { useState } from 'react'
import Calendar from '@/components/Calendar'
import EventForm from '@/components/EventsForm'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [events, setEvents] = useState([]);

  function handleAddEvent(newEvent) {
    setEvents([...events, newEvent]);
  }

  function handleCompleteEvent(index) {
    const updatedEvents = [...events];
    updatedEvents[index].completed = true;
    setEvents(updatedEvents);
  }

  return (
    <>
{/*       <Layout/> */}
      <EventForm onAdd={handleAddEvent} />
      <Calendar events={events} onComplete={handleCompleteEvent} />
    </>
  )
}
