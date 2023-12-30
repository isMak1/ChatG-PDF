"use client"
import { DrizzleChat } from '@/lib/db/schema'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { MessageCircle, PlusCircle } from 'lucide-react'
import axios from 'axios'
import SubscriptionButton from './SubscriptionButton'

type Props = {
  chats: DrizzleChat[],
  chatId: number,
  isPro: boolean,
}

const ChatSideBar = ({chats, chatId, isPro}: Props) => {
  const [loading, setLoading] = useState(false)

  return (
    <div className='w-full h-screen p-4 text-gray-200 bg-gray-900'>
      <Link href='/'>
        <Button className='w-full border-dashed border-gray-200 border hover:text-blue-300 hover:border-blue-300'>
          <PlusCircle className='mr-2 w-4 h-4' />
          New Chat
          </Button>
      </Link>

      <div className='flex flex-col gap-2 mt-4 transition-all duration-800'>
        {chats.map((chat) => (
          <Link href={`/chat/${chat.id}`} key={chat.id}>
            <Button className={`w-full text-ellipsis justify-start ${chat.id === chatId ? 'border-gradient-to-r from-slate-900 via-blue-300 to-slate-900' : 'hover:text-blue-300'}`}>
            <MessageCircle className='mr-2' />
            {chat.pdfName}
            </Button>
          </Link>
        ))}
      </div>
      
      <div className='absolute bottom-10 left-4'>
        <div className='flex items-center gap-2 text-sm text-slate-400 flex-wrap'>
          <Link href='/'>Home</Link>
          <Link href='/'>Source</Link>
        </div>
          <SubscriptionButton isPro={isPro} />


      </div>
    </div>
  )
}

export default ChatSideBar