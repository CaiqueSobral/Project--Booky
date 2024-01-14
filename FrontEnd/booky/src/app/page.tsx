'use client';

import { DefaultInput } from '@/components/input';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  return (
    <main className="w-full min-h-[100vh] flex items-center justify-center">
      <section className="flex lg:w-[800px] lg:h-[600px] md:w-[600px] md:h-[500px] bg-purple-800 shadow-xl rounded-xl flex-col justify-center items-center gap-16">
        <DefaultInput type="email" placeholder="E-mail" />
        <DefaultInput type="password" placeholder="Password" />
        <button
          type="button"
          id="btnLogin"
          className="w-1/4 bg-purple-200 py-4 px-4 text-3xl font-bold uppercase rounded-full text-purple-800 text-center hover:bg-purple-300"
          onClick={() => router.push('/home')}
        >
          Login
        </button>
      </section>
    </main>
  );
}
