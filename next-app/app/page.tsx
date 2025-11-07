"use client"

import { login } from "@/lib/actions/auth";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
   <div className="w-[40%] bg-slate-200 shadow-2xl p-13 border-2 rounded-md flex flex-col gap-6">
    <p className="text-center">You are not logged in</p>
    <button onClick={()=>login()} className="px-4 py-2 rounded-md bg-slate-600 text-slate-50 cursor-pointer">Sign in with Github</button>
   </div>
    </div>
  );
}
