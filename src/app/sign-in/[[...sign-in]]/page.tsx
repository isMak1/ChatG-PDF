import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-[100%] min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-sky-500 via-orange-200 to-yellow-600">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <SignIn/>
    </div>
    </div>
  )
}