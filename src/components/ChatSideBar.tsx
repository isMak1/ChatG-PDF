"use client"
import { DrizzleChat } from '@/lib/db/schema'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight, MessageCircle, PlusCircle } from 'lucide-react'

type Props = {
  chats: DrizzleChat[],
  chatId: number,
  isPro: boolean,
}

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(true);

  return (
    <div className={`h-[100%] flex flex-row-reverse overflow-y-scroll overflow-x-hidden bg-gray-900 ${isChatSidebarOpen ? 'w-[230px] md:w-[350px]' : 'w-0'} transition-all duration-500`}>
      <div className={`p-4 flex flex-col text-gray-200 ${isChatSidebarOpen ? 'w-full' : 'hidden'}`}>
        <Link href='/'>
          <Button className='w-full border-dashed border-gray-200 border hover:text-blue-300 hover:border-blue-300'>
            <PlusCircle className='mr-2 w-5 h-5' />
            New Chat
          </Button>
        </Link>

        <div className='flex flex-col max-w-[320px] gap-2 mt-4 text-[8px] lg:text-[24px] transition-all duration-800'>
          {chats.map((chat) => (
            <Link href={`/chat/${chat.id}`} key={chat.id}>
              <Button className={`overflow-hidden w-full justify-start ${chat.id === chatId ? 'border-gradient-to-r from-slate-900 via-blue-300 to-slate-900' : 'hover:text-blue-300'}`}>
                <MessageCircle className='mr-2' />
                {chat.pdfName}
              </Button>
            </Link>
          ))}
        </div>


      </div>
      <div className={`z-50 fixed transition-all duration-500 top-1/2 ${isChatSidebarOpen ? 'left-[190px] md:left-[310px]' : 'left-0'}`}>
        <button
          className={`focus:outline-none animate-pulse ${isChatSidebarOpen ? 'text-indigo-300' : 'text-indigo-800'}`}
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