'use client';

import { authUser } from '@/util/auth';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { UserContext } from './context/UserCtx';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const userContext = useContext(UserContext);

  const handleBtnClick = async () => {
    try {
      if (!email || !pass) {
        setErrorMessage('Preencha todos os campos.');
        return;
      }
      const user = await authUser(email, pass);

      if (!user) {
        throw new Error();
      }

      userContext.setUser(user);
      router.push('/home');
    } catch (err) {
      setErrorMessage('Wrong email or password');
    }
  };

  return (
    <main className="w-full min-h-[100vh] flex items-center justify-center">
      <section className="relative flex lg:w-[800px] lg:h-[600px] md:w-[600px] md:h-[500px] bg-purple-800 shadow-xl rounded-xl flex-col justify-center items-center gap-16">
        <input
          id="email"
          alt="email input"
          type="email"
          name="email"
          placeholder="E-mail"
          required
          className="placeholder-purple-300 w-2/3 rounded-full bg-purple-100 text-4xl px-8 py-4 font-semibold align-middle text-purple-800"
          onChange={(value) => setEmail(value.target.value)}
        ></input>
        <input
          id="password"
          alt="password input"
          type="password"
          name="password"
          placeholder="Password"
          required
          className="placeholder-purple-300 w-2/3 rounded-full bg-purple-100 text-4xl px-8 py-4 font-semibold align-middle text-purple-800"
          onChange={(value) => setPass(value.target.value)}
        ></input>
        <button
          id="btnLogin"
          onClick={() => handleBtnClick()}
          className="w-1/4 bg-purple-200 py-4 px-4 text-3xl font-bold uppercase rounded-full text-purple-800 text-center hover:bg-purple-300"
        >
          Login
        </button>
        {errorMessage && (
          <span className="text-base text-purple-100 text-center absolute bottom-8">
            {errorMessage}
          </span>
        )}
      </section>
    </main>
  );
}
