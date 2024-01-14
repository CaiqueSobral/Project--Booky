'use client';

import { useState } from 'react';

export default function HomePage() {
  const [selectedStatus, setStatus] = useState('Quero Ler');

  const seila = [
    {
      book: 'As crônicas de Nárnia',
      author: 'Com certeza um author',
    },
    { book: 'Harry Potter', author: 'JK Rolando' },
    { book: 'As crônicas de Silva', author: 'Autor Silva' },
    { book: 'As crônicas de Sauro', author: 'Autor Sauro' },
    { book: 'As crônicas de Lopes', author: 'Autor Lopes' },
    { book: 'As crônicas de Silva', author: 'O Autor da Silva' },
  ];
  return (
    <main className="w-full min-h-[100vh] flex items-center justify-center flex-col gap-16 my-8">
      {seila.map((item, i) => {
        return (
          <div
            key={i}
            className="relative w-[800px] h-[300px] bg-purple-700 rounded-xl px-4 py-4 flex items-center justify-center gap-6 shadow-2xl"
          >
            <div className="flex-1 w-2/5 h-full  flex flex-col items-center justify-center gap-8">
              <span className="text-2xl text-purple-100 bg-purple-400 rounded-xl px-4 py-2 font-semibold text-justify">
                {item.book}
              </span>
              <span className="text-2xl text-purple-100 bg-purple-400 rounded-xl px-4 py-2 font-semibold">
                {item.author}
              </span>
            </div>
            <div className="flex-1 w-2/5 h-full rounded-xl flex flex-col items-center justify-center gap-6 bg-purple-400">
              {selectedStatus === 'Concluído' ? (
                <input
                  type="text"
                  about="Book Score"
                  defaultValue={0}
                  className="text-8xl text-purple-100 bg-purple-400 h-24 w-24 rounded-xl text-center align-middle"
                ></input>
              ) : (
                <input
                  type="text"
                  about="Book Score"
                  disabled
                  value={'-'}
                  className="text-8xl text-purple-100 bg-purple-400 h-24 w-24 rounded-xl text-center align-middle"
                ></input>
              )}

              <select
                id="status"
                className="text-base font-semibold px-2 py-2 bg-purple-700 text-purple-100 rounded-xl"
                onChange={(item) => {
                  setStatus(item.target.value);
                }}
              >
                <option about="reading status" value="Quero Ler">
                  {'Quero ler'}
                </option>
                <option about="reading status" value="Lendo">
                  {'Lendo'}
                </option>
                <option about="reading status" value="Concluído">
                  {'Concluído'}
                </option>
              </select>
            </div>
            <span className="absolute text-sm rounded-xl px-4 py-2 font-medium text-purple-100 bottom-2 left-2">{`Adicionado em ${'27/07/2001'}`}</span>
          </div>
        );
      })}
    </main>
  );
}
