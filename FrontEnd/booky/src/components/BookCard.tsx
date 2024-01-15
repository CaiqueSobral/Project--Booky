'use client';

import moment from 'moment';
import { useState } from 'react';

type Props = {
  listedBook: {
    book: {
      author: string;
      id: string;
      title: string;
    };
    dateAdded: Date;
    dateConcluded: Date | null;
    id: string;
    score: number;
    status: string;
  };
  deleteBook: (id: string) => void;
};

export function BookCard(props: Props) {
  const [selectedStatus, setStatus] = useState(props.listedBook.status);
  const [selectedScore, setScore] = useState(props.listedBook.score);

  return (
    <div className="relative lg:w-[800px] lg:h-[300px] md:w-[600px] md:h-[300px] bg-purple-700 rounded-xl px-4 py-4 flex items-center justify-center gap-6 shadow-2xl">
      <span
        onClick={() => props.deleteBook(props.listedBook.id)}
        className="absolute top-2 left-4 font-semibold text-purple-100 text-xl"
      >
        X
      </span>
      <div className="flex-1 w-2/5 h-full  flex flex-col items-center justify-center gap-8">
        <span className="lg:text-2xl md:text-lg text-purple-100 bg-purple-400 rounded-xl px-4 py-2 font-semibold text-justify">
          {props.listedBook.book.title}
        </span>
        <span className="lg:text-2xl md:text-lg text-purple-100 bg-purple-400 rounded-xl px-4 py-2 font-semibold">
          {props.listedBook.book.author}
        </span>
      </div>
      <div className="flex-1 w-2/5 h-full rounded-xl flex flex-col items-center justify-center gap-6 bg-purple-400">
        {selectedStatus === 'Lido' ? (
          <input
            type="text"
            about="Book Score"
            defaultValue={selectedScore}
            className="lg:text-8xl md:text-6xl text-purple-100 bg-purple-400 h-24 w-24 rounded-xl text-center align-middle"
          ></input>
        ) : (
          <input
            type="text"
            about="Book Score"
            disabled
            value={'-'}
            className="lg:text-8xl  md:text-6xl text-purple-100 bg-purple-400 h-24 w-24 rounded-xl text-center align-middle"
          ></input>
        )}

        <select
          id="status"
          className="text-base font-semibold px-2 py-2 bg-purple-700 text-purple-100 rounded-xl"
          defaultValue={props.listedBook.status}
          onChange={(item) => {
            setStatus(item.target.value);
            setScore(0);
          }}
        >
          <option about="reading status" value="Quero Ler">
            {'Quero ler'}
          </option>
          <option about="reading status" value="Lendo">
            {'Lendo'}
          </option>
          <option about="reading status" value="Lido">
            {'Lido'}
          </option>
        </select>
      </div>
      <span className="absolute text-sm rounded-xl px-4 py-2 font-medium text-purple-100 bottom-2 left-2">{`Adicionado em ${moment(
        props.listedBook.dateAdded
      ).format('DD/MM/YYYY')}`}</span>
    </div>
  );
}
