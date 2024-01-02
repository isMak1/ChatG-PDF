import { Button } from '@/components/ui/button'
import { UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowRight, LogIn } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import { checkSubscription } from '@/lib/subscription'
import SubscriptionButton from '@/components/SubscriptionButton'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();

  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="w-[100%] min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-sky-500 via-orange-200 to-yellow-600">
      <div className="absolute right-0 m-3 rounded-full drop-shadow-xl items-center">
        <UserButton afterSignOutUrl='/' />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 lg:text-5xl text-3xl font-semibold">Chat with any PDF</h1>
          </div>
          <div className="flex mt-2">
            {isAuth && firstChat && (
            <Link href={`/chat/${firstChat.id}`}>
              <Button>
                Go To Chats
                <ArrowRight className='ml-2' />
              </Button>
            </Link>
            )}
            <div className="ml-3">
              <SubscriptionButton isPro={isPro} />
            </div>
          </div>
          <p className='max-w-xl mt-1 text-lg text-slate-600'>
          Discover the groundbreaking AI-driven smart PDF search, revolutionizing research efficiency!
          </p>
          <div className='w-full mt-4'>
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>Login to Get Started
                  <LogIn className='w-5 h-5 m-2' />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
