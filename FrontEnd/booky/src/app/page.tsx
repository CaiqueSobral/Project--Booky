import { DefaultInput } from '@/components/input';
import Link from 'next/link';

export default function Login() {
  return (
    <main className="w-full min-h-[100vh] flex items-center justify-center">
      <section className="flex lg:w-[800px] lg:h-[600px] md:w-[600px] md:h-[500px] bg-purple-800 shadow-xl rounded-xl flex-col justify-center items-center gap-16">
        <DefaultInput type="email" placeholder="E-mail" />
        <DefaultInput type="password" placeholder="Password" />
        <Link
          href={'/home'}
          id="btnLogin"
          className="w-1/4 bg-purple-200 py-4 px-4 text-3xl font-bold uppercase rounded-full text-purple-800 text-center"
        >
          Login
        </Link>
      </section>
    </main>
  );
}
