"use client"
import { DrizzleChat } from '@/lib/db/schema'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { ChevronLeftCircle, ChevronRightCircle, MessageCircle, PlusCircle } from 'lucide-react'
import SubscriptionButton from './SubscriptionButton'

type Props = {
  chats: DrizzleChat[],
  chatId: number,
  isPro: boolean,
}

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(true);

  return (
    <div className={`h-[100vh] flex flex-row overflow-y-scroll overflow-x-hidden bg-gray-900 ${isChatSidebarOpen ? 'w-full' : 'w-[65px]'}`}>
      <div className={`p-4 text-gray-200  ${isChatSidebarOpen ? 'w-full' : 'hidden'}`}>
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
          <div className='w-[33%]  bg-gray-900'>
            <div className='flex w-full items-center gap-2 text-sm text-slate-400 '>
              <Link href='/'><Button variant="link">Home</Button></Link>
              <Link href='/'><Button variant="link">Source</Button></Link>
              <div className="">
                <SubscriptionButton isPro={isPro} />
              </div>
            </div>
          </div>

      <div className="pl-1 pr-1 pt-[50vh] bg-gray-900">
        <button
          className="focus:outline-none"
          onClick={() => setIsChatSidebarOpen(!isChatSidebarOpen)}
        >
          {isChatSidebarOpen ? (
            <ChevronLeftCircle className="w-10 h-10 text-gray-300" />
          ) :
            (
              <ChevronRightCircle className="w-10 h-10 text-gray-300" />
            )}
        </button>
      </div>
      </div>
    </div>

  )
}

export default ChatSideBar