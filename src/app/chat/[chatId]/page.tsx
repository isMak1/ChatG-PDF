import ChatComponent from '@/components/ChatComponent';
import ChatSideBar from '@/components/ChatSideBar';
import PDFViewer from '@/components/PDFViewer';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
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
    <div className='flex max-h-screen overflow-hidden'>
      <div className="flex w-full max-h-screen">
        {/* chat sidebar */}
        <div className={`w-[50%] h-full-screen mx-z-xs`}>
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        </div>
        <div className="flex flex-col overflow-hidden">
          {/* pdf viewer */}
          <div className="max-h-screen p-4">
            <PDFViewer pdf_url={currentChat?.pdfUrl ?? ''} />
          </div>
          {/* chat component */}
          <div className="border-l-slate-200 overflow-scroll">
            <ChatComponent chatId={parseInt(chatId)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage;