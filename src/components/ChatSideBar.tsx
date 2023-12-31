"use client"
import { DrizzleChat } from '@/lib/db/schema'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronLeftCircle, ChevronRight, ChevronRightCircle, MessageCircle, PlusCircle } from 'lucide-react'
import SubscriptionButton from './SubscriptionButton'

type Props = {
  chats: DrizzleChat[],
  chatId: number,
  isPro: boolean,
}

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(true);

  return (
    <div className={`transition-all mr-8 duration-500 max-h-[100%] flex flex-row overflow-y-scroll overflow-x-hidden bg-gray-900 ${isChatSidebarOpen ? 'min-w-[200px] max-w-[300px]' : 'w-0'}`}>
      <div className={`p-4 text-gray-200 ${isChatSidebarOpen ? 'w-full' : 'hidden'}`}>
        <Link href='/'>
          <Button className='w-full border-dashed border-gray-200 border hover:text-blue-300 hover:border-blue-300'>
            <PlusCircle className='mr-2 w-4 h-4' />
            New Chat
          </Button>
        </Link>

        <div className='flex flex-col gap-2 mt-4 transition-all duration-800'>
          {chats.map((chat) => (
            <Link href={`/chat/${chat.id}`} key={chat.id}>
              <Button className={`w-full overflow-hidden justify-start ${chat.id === chatId ? 'border-gradient-to-r from-slate-900 via-blue-300 to-slate-900' : 'hover:text-blue-300'}`}>
                <MessageCircle className='mr-2' />
                {chat.pdfName}
              </Button>
            </Link>
          ))}
        </div>
        
      </div>

      <div className={`fixed transition-all duration-500 pt-[50vh]  ${isChatSidebarOpen ? 'md:ml-[260px] pl-3 ml-[185px]' : 'ml-0 pl-0'}`}>
        <button
          className="focus:outline-none animate-pulse text-blue-700"
          onClick={() => setIsChatSidebarOpen(!isChatSidebarOpen)}
        >
          {isChatSidebarOpen ? (
            <ChevronLeft className="w-10 h-10" />
          ) : (
            <ChevronRight className="w-10 h-10 " />
          )}
        </button>
      </div>
    </div>

  )
}

export default ChatSideBar