'use client';

import { authUser } from '@/util/auth';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBtnClick = async () => {
    try {
      if (!email || !pass || !name || !passConfirm) {
        setErrorMessage('Preencha todos os campos.');
        return;
      }

      if (pass !== passConfirm) {
        setErrorMessage('As senhas devem ser iguais.');
        return;
      }

      const res = await fetch('http://localhost:3001/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: pass,
        }),
      });

      console.log(res);

      if (res.status !== 201) {
        setErrorMessage('Email already in use');
        return;
      }

      router.push('/');
    } catch (err) {
      setErrorMessage('Email already in use');
    }
  };

  return (
    <main className="w-full min-h-[100vh] flex items-center justify-center">
      <section className="relative flex lg:w-[800px] lg:h-[600px] md:w-[600px] md:h-[500px] bg-purple-800 shadow-xl rounded-xl flex-col justify-center items-center gap-8">
        <span
          onClick={() => router.push('/')}
          className="absolute text-purple-100 top-2 left-4 font-semibold text-3xl"
        >
          {'<'}
        </span>
        <input
          id="name"
          alt="name input"
          type="name"
          name="name"
          placeholder="Name"
          required
          className="placeholder-purple-300 w-2/3 rounded-full bg-purple-100 text-2xl px-8 py-2 font-semibold align-middle text-purple-800"
          onChange={(value) => setName(value.target.value)}
        ></input>
        <input
          id="email"
          alt="email input"
          type="email"
          name="email"
          placeholder="E-mail"
          required
          className="placeholder-purple-300 w-2/3 rounded-full bg-purple-100 text-2xl px-8 py-2 font-semibold align-middle text-purple-800"
          onChange={(value) => setEmail(value.target.value)}
        ></input>
        <input
          id="password"
          alt="password input"
          type="password"
          name="password"
          placeholder="Password"
          required
          className="placeholder-purple-300 w-2/3 rounded-full bg-purple-100 text-2xl px-8 py-2 font-semibold align-middle text-purple-800"
          onChange={(value) => setPass(value.target.value)}
        ></input>
        <input
          id="passwordConfirm"
          alt="password Confirm input"
          type="password"
          name="password Confirm"
          placeholder="Confirm Password"
          required
          className="placeholder-purple-300 w-2/3 rounded-full bg-purple-100 text-2xl px-8 py-2 font-semibold align-middle text-purple-800"
          onChange={(value) => setPassConfirm(value.target.value)}
        ></input>
        <button
          id="btnLogin"
          onClick={() => handleBtnClick()}
          className="bg-purple-200 py-4 px-6 text-2xl font-bold uppercase rounded-full text-purple-800 text-center hover:bg-purple-300"
        >
          Register
        </button>
        {errorMessage && (
          <span className="text-base text-purple-100 text-center absolute bottom-4">
            {errorMessage}
          </span>
        )}
      </section>
    </main>
  );
}
