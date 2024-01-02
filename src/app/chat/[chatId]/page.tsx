import ChatComponent from '@/components/ChatComponent';
import ChatSideBar from '@/components/ChatSideBar';
import PDFViewer from '@/components/PDFViewer';
import SubscriptionButton from '@/components/SubscriptionButton';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId)
    return redirect('/');

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats)
    return redirect('/');

  if (!_chats.find((chat) => chat.id === parseInt(chatId)))
    return redirect('/');

  const currentChat = _chats.find(chat => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();

  return (
    <div className='flex h-screen overflow-hidden'>
      <div className="flex flex-col w-full">
        <div className="flex w-full h-[96%]">
          {/* chat sidebar */}
          <div className={`max-w-[50%] max-h-full mx-z-xs`}>
            <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
          </div>
          <div className="flex flex-col w-full justify-between">
            {/* pdf viewer */}
            <div className="max-h-[80%] p-4 pb-0">
              <PDFViewer pdf_url={currentChat?.pdfUrl ?? ''} />
            </div>
            {/* chat component */}
            <div className="border-l-slate-200 overflow-scroll">
              <ChatComponent chatId={parseInt(chatId)} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full flex-row bg-gray-900">
          <div className='flex w-full px-3 justify-between items-center gap-2 text-sm text-slate-400 '>
            <Link href='/'><Button variant="link">Home</Button></Link>
            <Link href='/'><Button variant="link">Source</Button></Link>
            <div className="">
              <SubscriptionButton isPro={isPro} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage;