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
import Canvas3D from '@/components/Canvas3D'


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
    <>
      <div className="flex w-[100%] h-screen bg-black">
        <div className="absolute overflow-hidden max-h-screen right-[-43rem] bottom-[5rem] md:bottom-0 md:right-3">
          <Canvas3D />
        </div>
        <div className="absolute right-2 top-0 m-7  rounded-full drop-shadow-md shadow-white items-center">
          <UserButton afterSignOutUrl='/' />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="sparky flex gap-10 flex-col items-center text-center">
            <div className="flex items-center magic">
              <h1 className="drop-shadow-xl mr-3 xl:text-8xl text-3xl font-semibold animate-background-pan bg-gradient-to-bl from-violet-900 via-indigo-400 to-violet-900">AI PDF Context Chats</h1>
            </div>
            <div className={`flex mt-2 gap-y-10 ${isAuth ? 'flex-col' : 'flex-row gap-x-10'}`}>
              <div className="flex">
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
              <div className='w-full'>
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
            <p className='animate-text max-w-xl mt-1 text-xl text-slate-300 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900'>
              Discover the groundbreaking AI-driven smart PDF search, revolutionizing research efficiency!
            </p>

          </div>
        </div>
      </div>
    </>
  )
}
